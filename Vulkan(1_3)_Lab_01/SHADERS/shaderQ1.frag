#version 450

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;
    vec3 lightPos;
    vec3 eyePos;
} ubo;

layout(binding = 1) uniform sampler2D texSampler[1]; // HARD-CODED for 2 textures

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec3 fragWorldPos;
layout(location = 2) in vec3 fragWorldNormal;
layout(location = 3) in vec2 fragTexCoord;

layout(location = 0) out vec4 outColor;

float cubicWeight(float x) {
    x = abs(x);
    if (x <= 1.0)
        return (1.5 * x - 2.5) * x * x + 1.0;
    else if (x < 2.0)
        return ((-0.5 * x + 2.5) * x - 4.0) * x + 2.0;
    else
        return 0.0;
}

vec4 textureBicubic(sampler2D tex, vec2 uv, vec2 texSize) {
    uv = uv * texSize - 0.5;
    vec2 f = fract(uv);
    uv -= f;
    vec4 result = vec4(0.0);
    for (int j = -1; j <= 2; ++j)
        for (int i = -1; i <= 2; ++i)
            result += texture(tex, (uv + vec2(i, j) + 0.5) / texSize)
                      * cubicWeight(f.x - float(i)) * cubicWeight(f.y - float(j));
    return result;
}

void main() {

    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 ambientMaterial = vec3(0.1, 0.2, 0.1);
    vec3 diffMaterial = vec3(0.9, 0.7, 0.9);

    //Diffuse shading
    vec3 norm = normalize(fragWorldNormal);
    vec3 lightDir = normalize(ubo.lightPos - fragWorldPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // Specular shading
    vec3 viewDir = normalize(ubo.eyePos - fragWorldPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float shininess = 32.0;
    float spec = pow(max(dot(reflectDir, viewDir), 0.0), shininess);
    vec3 specularMaterial = vec3(1.0);

    vec3 ambientLight = ambientMaterial * lightColor;
    vec3 diffuseLight = diffMaterial * lightColor * diffuse;
    vec3 specularLight = specularMaterial * lightColor * spec;
    //vec3 litColor = (ambientLight + diffuseLight + specularLight) * fragColor;
    //vec4 texColor = texture(texSampler, fragTexCoord);
    //vec4 texColor = textureBicubic(texSampler, fragTexCoord, vec2(256.0, 256.0));
    //vec4 baseColor = texture(texSampler[0], fragTexCoord);
    //vec4 overlay = texture(texSampler[1], fragTexCoord);
    //vec4 texColor = mix(baseColor, overlay, overlay.a);
    //QUESTION 1
    vec4 texColor = texture(texSampler[0], fragTexCoord);

    vec3 litColor = (ambientLight + diffuseLight) * texColor.rgb + specularLight;

    outColor = vec4(litColor, 1.0);

    //outColor = vec4(fragColor, 1.0);
}
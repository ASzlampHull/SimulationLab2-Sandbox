#version 450

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;
    vec3 lightPos;
    vec3 eyePos;
} ubo;

// QUESTION 2
layout(binding = 1) uniform sampler2D texSampler[2]; // HARD-CODED for 2 textures

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec3 fragWorldPos;
layout(location = 2) in vec3 fragWorldNormal;
layout(location = 3) in vec2 fragTexCoord;
layout(location = 4) in vec3 fragLightPos_tangent;
layout(location = 5) in vec3 fragViewPos_tangent;
layout(location = 6) in vec3 fragPos_tangent;

layout(location = 0) out vec4 outColor;

// QUESTION 4
vec3 bumpNormal(vec2 texCoord) {
    vec3 N = vec3(0.0, 0.0, 1.0); // Default normal pointing out of the surface
    float radius = 0.5; // Radius of the bump
    vec2 st = 2.0*fract(texCoord.xy) -1.0; // Map to -1.0 to +1.0
    float R2 = radius*radius - dot(st,st);

    // Only adjust normal if we are within the radius
    if (R2>0.0)
        N.xy=st/sqrt(R2);

    return normalize(N);
}

void main() {

    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 ambientMaterial = vec3(0.1, 0.2, 0.1);
    vec3 diffMaterial = vec3(0.9, 0.7, 0.9);
    vec3 specularMaterial = vec3(1.0);
    
    //QUESTION 2
    // Base texture
    vec3 albedo = texture(texSampler[0], fragTexCoord).rgb;

    //Normal map texture
    //vec3 N_tangent = texture(texSampler[1], fragTexCoord).rgb;
    //N_tangent = normalize(N_tangent * 2.0 - 1.0);

    //QUESTION 3
    //float h = texture(texSampler[1], fragTexCoord).r;
    
    //float dFx = dFdx(h);
    //float dFy = dFdy(h);

    //float bumpHeight = 0.1; // a value between 0.1 and 1
    //vec3 norm = normalize(vec3(-dFx, -dFy, bumpHeight));

    //QUESTION 4
    float bumpDensity = 10;
    float x = bumpDensity * fragTexCoord.x;
    float y = bumpDensity * fragTexCoord.y;
    vec3 norm = bumpNormal(vec2(x, y));

    //Diffuse shading
    //vec3 norm = normalize(fragWorldNormal);
    //vec3 norm = N_tangent;
    //vec3 lightDir = normalize(ubo.lightPos - fragWorldPos);
    vec3 lightDir = normalize(fragLightPos_tangent - fragPos_tangent);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // Specular shading
    //vec3 viewDir = normalize(ubo.eyePos - fragWorldPos);
    vec3 viewDir = normalize(fragViewPos_tangent - fragPos_tangent);
    vec3 reflectDir = reflect(-lightDir, norm);
    float shininess = 32.0;
    float spec = pow(max(dot(reflectDir, viewDir), 0.0), shininess);

    vec3 ambientLight = ambientMaterial * lightColor;
    vec3 diffuseLight = diffMaterial * lightColor * diffuse;
    vec3 specularLight = specularMaterial * lightColor * spec;

    vec3 litColor = (ambientLight + diffuseLight) * albedo.rgb + specularLight;

    outColor = vec4(litColor, 1.0);

    //outColor = vec4(fragColor, 1.0);
} 
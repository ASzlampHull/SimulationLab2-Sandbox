#version 450

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;
    vec3 lightPos;
    vec3 eyePos;
} ubo;

layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec3 inColor;
layout(location = 2) in vec3 inNormal;
layout(location = 3) in vec2 inTexCoord;

layout(location = 0) out vec3 fragColor;
layout(location = 1) out vec3 fragWorldPos;
layout(location = 2) out vec3 fragWorldNormal;
layout(location = 3) out vec2 fragTexCoord;

void main() {

    gl_Position = ubo.proj * ubo.view * ubo.model * vec4(inPosition, 1.0);
    
    fragColor = inColor;
    fragWorldPos = (ubo.model * vec4(inPosition, 1.0)).xyz;
    fragWorldNormal = mat3(transpose(inverse(ubo.model))) * inNormal;
    fragTexCoord = inTexCoord;

    /*vec3 worldPos = (ubo.model * vec4(inPosition, 1.0)).xyz;
    vec3 worldNormal = mat3(transpose(inverse(ubo.model))) * inNormal;

    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 ambientMaterial = vec3(0.2, 0.1, 0.2);

    // Diffuse shading
    vec3 norm = normalize(worldNormal);
    vec3 lightDir = normalize(ubo.lightPos - worldPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    vec3 diffMaterial = vec3(1.0);

    // Specular shading
    vec3 viewDir = normalize(ubo.eyePos - worldPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float shininess = 32.0;
    float spec = pow(max(dot(reflectDir, viewDir), 0.0), shininess);
    vec3 specularMaterial = vec3(1.0);

    vec3 ambientLight = ambientMaterial * lightColor;
    vec3 diffuseLight = diffMaterial * lightColor * diffuse;
    vec3 specularLight = specularMaterial * lightColor * spec;
    fragColor = (ambientLight + diffuseLight + specularLight) * inColor;*/

    //fragColor = (ambientMaterial + diffuse * diffMaterial) * inColor;

}
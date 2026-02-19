#include "ScenarioPhysicsObjects.h"
#include "Renderer.h"
#include "InputManager.h"

void ScenarioPhysicsObjects::OnLoad()
{
	std::cout << "Loading Physics Objects Scenario" << name << std::endl;
	std::vector<std::string> sjgFilePaths;
	std::vector<Transformations> transformations;
	sjgFilePaths.push_back("models/PhysicsObjects/sphere.sjg");
	Transformations transform = { glm::vec3(0.0f), glm::vec3(0.0f), glm::vec3(1.0f) };
	transformations.push_back(transform);
	renderer->GetResourceManager().CreateSJGModels(sjgFilePaths, transformations);
	renderer->GetResourceManager().CreateVertexIndexBuffers(renderer->GetCoreVulkanPtr(), renderer->GetCommandPoolVulkanPtr());
	renderer->GetResourceManager().CreateTextures(renderer->GetCoreVulkanPtr(), renderer->GetCommandPoolVulkanPtr(), renderer->GetPipelineVulkanPtr(), renderer->GetUniformBufferObject());
}

void ScenarioPhysicsObjects::OnUpdate(float deltaTime, const InputManager& input)
{
	renderer->UpdatePhysicsTime();
	renderer->DrawFrame();
}

void ScenarioPhysicsObjects::OnUnload()
{
	std::cout << "Unloading Physics Objects Scenario" << name << std::endl;
}
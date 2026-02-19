#include "ScenarioPhysicsObjects.h"
#include "Renderer.h"
#include "InputManager.h"

void ScenarioPhysicsObjects::OnLoad()
{
	std::cout << "Loading Physics Objects Scenario" << name << std::endl;
	std::vector<std::string> sjgFilePaths;
	sjgFilePaths.push_back("models/PhysicsObjects/sphere.sjg");
	renderer->GetResourceManager().CreateSJGModels(sjgFilePaths);
	renderer->GetResourceManager().CreateVertexIndexBuffers(renderer->GetCoreVulkanPtr(), renderer->GetCommandPoolVulkanPtr());
	renderer->GetResourceManager().CreateTextures(renderer->GetCoreVulkanPtr(), renderer->GetCommandPoolVulkanPtr(), renderer->GetPipelineVulkanPtr(), renderer->GetUniformBufferObject());
}

void ScenarioPhysicsObjects::OnUpdate(float deltaTime, const InputManager& input)
{
	renderer->DrawFrame();
}

void ScenarioPhysicsObjects::OnUnload()
{
	std::cout << "Unloading Physics Objects Scenario" << name << std::endl;
}

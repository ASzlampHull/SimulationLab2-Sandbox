#include "ScenarioDefault.h"
#include "Renderer.h"

void ScenarioDefault::OnLoad() {
	std::cout << "Loading Default Scenario" << name << std::endl;
}

void ScenarioDefault::OnUpdate(float deltaTime) {
	renderer->DrawFrame();
}

void ScenarioDefault::OnUnload() {
	std::cout << "Unloading Default Scenario" << name << std::endl;
}
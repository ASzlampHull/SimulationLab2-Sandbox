#pragma once
#include "Scenario.h"

class ScenarioPhysicsObjects : public Scenario
{
public:
	ScenarioPhysicsObjects(Renderer* renderer) {
		this->renderer = renderer;
		name = "Physics Objects Scenario";
	}
	virtual void OnLoad() override;
	virtual void OnUpdate(float deltaTime, const InputManager& input) override;
	virtual void OnUnload() override;
};
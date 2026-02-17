#include "ScenarioClearColor.h"
#include "Renderer.h"
#include "InputManager.h"

void ScenarioClearColor::OnLoad()
{
}

void ScenarioClearColor::OnUpdate(float deltaTime, const InputManager& input)
{
	renderer->DrawFrame();
}

void ScenarioClearColor::OnUnload()
{
}

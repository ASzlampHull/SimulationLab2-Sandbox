#pragma once
#include <string>

class Renderer;

class Scenario
{
private:

protected:
	std::string name;
	Renderer* renderer;

public:
	virtual ~Scenario() {};

	virtual void OnLoad() = 0;
	virtual void OnUpdate(float deltaTime) = 0;
	virtual void OnUnload() = 0;

	std::string GetName() const { return name; }
};
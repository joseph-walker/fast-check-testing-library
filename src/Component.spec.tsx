import * as React from "react";

import {
	Command,
	constant,
	property,
	commands,
	modelRun,
	assert,
} from "fast-check";
import { fireEvent, render, screen } from "@testing-library/react";

import { Component } from "./Component";
import { cleanup } from "@testing-library/react";
import { RenderResult } from "@testing-library/react";

type Model = {
	count: number;
};

class IncrementCommand implements Command<Model, RenderResult> {
	check = () => true;
	toString = () => "Increment";

	run(model: Model, real: RenderResult) {
		model.count++;
		fireEvent.click(real.getByTestId("inc"));
		expect(real.getByRole("heading")).toHaveTextContent(`${model.count}`);
	}
}

class DecerementCommand implements Command<Model, RenderResult> {
	check = () => true;
	toString = () => "Decrement";

	run(model: Model, _: RenderResult) {
		model.count--;
		fireEvent.click(screen.getByTestId("dec"));
		expect(screen.getByRole("heading")).toHaveTextContent(`${model.count}`);
	}
}

const counterCommands = [
	constant(new IncrementCommand()),
	constant(new DecerementCommand()),
];

describe("Counter Component", function () {
	it("increments a count when clicked", async function () {
		assert(
			property(commands(counterCommands), function (cmds) {
				const s = () => ({
					model: { count: 0 },
					real: render(<Component count={0} />),
				});
				modelRun(s, cmds);
			}).afterEach(() => cleanup())
		);
	});
});

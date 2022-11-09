import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

import App from "./App";

const user = userEvent.setup();

describe("App test", () => {
	test("should show title all the time", async () => {
		render(<App />);

		await user.click(screen.getByTestId("test-Component"));
		// await user.click(screen.getByTestId("test-Component"));

		screen.debug();

		expect(screen.getByText("Jello World!")).toBeDefined();
		expect(screen.getByText("1")).toBeDefined();
	});

	test.todo("more tests here");
});

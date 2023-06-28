import { screen, render } from "@testing-library/react";
import { Card } from "./Card.component";
import { BiCoffeeTogo } from "react-icons/bi";
describe("Testing card component", () => {
    beforeEach(() => {
        render(
            <Card
                title='test'
                icon={<BiCoffeeTogo />}
                value={1}
                badgeValue={1}
            />
        );
    });

	test("should render the card component", () => {
        const card = screen.getByText("test");
		expect(card).toBeDefined();
	});
});

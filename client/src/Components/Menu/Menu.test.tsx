import {render , screen} from '@testing-library/react';
import  Menu  from './Menu.component';
describe("Testing Menu Component", () => {
    test("Should render the component",()=>{
        render(Menu({children: <div>Outlet</div>, sideBarContent: <div>Menu</div>}));
        const element = screen.getByText("Menu");
        expect(element).toBeDefined(); 
    } )
} ); 
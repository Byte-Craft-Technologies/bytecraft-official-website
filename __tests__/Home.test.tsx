import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react';
import Home from '@/app/page';

describe('Home',()=>{
  it('should have Docs text',()=>{
    render(<Home/>) //ARRANGE
    
    const myElement = screen.getByText('Docs'); //ACT
    
    expect(myElement).toBeInTheDocument();
    });

    it('should contain the text "information',()=>{
      render(<Home/>) //ARRANGE
      
      const myElement = screen.getByRole('heading',{
        name:'Learn'
      }); //ACT
      
      expect(myElement).toBeInTheDocument();
      })
      it('should have a heading',()=>{

      })
})
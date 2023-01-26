import React from 'react';
import {render,screen} from '@testing-library/react'
import Footer from '../Components/Footer'

describe('Footer',()=>{

    test('Find footer',()=>{
        let utils = render(<Footer/>);
        expect(utils).toBeTruthy();
    })
    test('Find text footer left',()=>{
        render(<Footer/>);
        screen.getAllByText('©2022 Digital Booking');
    })
    
})
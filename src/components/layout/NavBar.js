import React from 'react'
import styled from 'styled-components';

const NavBar = () => {
    return (
        <>
            <nav className='navbar navbar-expand-md navbar-dark fixed-top'
            style={{backgroundColor: '#ef5350'}}>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0 align-items-center'>Pokedex</a>
            </nav>
        </>
    )
}

export default NavBar

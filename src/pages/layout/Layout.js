import React from 'react'
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"

function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout
import React from 'react';
import Header from './_components/Header';

function DashboardLayout({ children }) {
    return (
        <div>
            <Header />
            <div className='pt-10 px-10 md:px-20 lg:px-40 sl:px-60'>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;

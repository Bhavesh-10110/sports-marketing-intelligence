import React from 'react'
import { Link } from 'react-router-dom'
import InputFeatures from '../components/InputFeatures'

const Home = () => {
    return (
        <div className='min-h-screen'>
            <header className='px-6 py-4'>
                <Link to='/' className='result-button result-button-secondary'>
                    ← Landing
                </Link>
            </header>

            <InputFeatures />
        </div>
    )
}

export default Home

import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import CheckoutForm from '../pages/Checkout';

const RoutesComponents = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/checkout' element={<CheckoutForm />} />
        </Routes>
    );
};

export default RoutesComponents;

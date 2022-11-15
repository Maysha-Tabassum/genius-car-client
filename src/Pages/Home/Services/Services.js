import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
const Services = () => {
    const [services, setServices] = useState([]);
         useEffect( ()=> {
            fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data))
         })
    return (
        <div>
            <div className="text-center mb-6">
                <p className="text-2xl font-bold text-orange-600">Services</p>
                <h2 className='text-5xl font-semibold'>Our Service Area</h2>
                <p>The Majority Have Suffered Alteration in Some Form, By injacted Humour, Or Randomized. <br/>
                Words Which Don't Look Even Slightly Believable</p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-3'>
                {
                    services.map(service => <ServiceCard
                       key={service._id}
                       service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;
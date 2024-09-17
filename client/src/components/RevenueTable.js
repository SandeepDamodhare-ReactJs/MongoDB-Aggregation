import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RevenueTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/sales/revenue');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Revenue Table</h1>
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Store</th>
                  <th>Month</th>
                            <th>Total Revenue</th>
                            <th>Average Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.store}</td>
                                <td>{item.month}</td>

                                
                       <td>{item.totalRevenue}</td>
                                <td>{item.averagePrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default RevenueTable;

/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { message, Select } from 'antd';
import '../App.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchQuestions, setCategory, setDifficulty } from '../redux/actions/quizActions';


const Category = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    // const [selectedCategory, setSelectedCategory] = useState(null);
    // const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get('https://opentdb.com/api_category.php')
            .then((response) => {
                const { trivia_categories } = response.data;
                setCategories(trivia_categories);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleMenuClick = () => {
        if (selectedCategory && selectedDifficulty) {
            message.info(`Selected category: ${selectedCategory}, Difficulty: ${selectedDifficulty}`);
            dispatch(fetchQuestions(selectedCategory, selectedDifficulty));
        }
    };
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        handleMenuClick();
    };

    const handleDifficultyChange = (value) => {
        setSelectedDifficulty(value);
        handleMenuClick();
    };
    useEffect(() => {
        // Call handleMenuClick whenever either selectedCategory or selectedDifficulty changes
        handleMenuClick();
    }, [selectedCategory, selectedDifficulty]);

    return (
        <div className='cat-dropdown'>
            <Select
                className='ant-select-selection span'

                placeholder="Choose Category"
                onChange={handleCategoryChange}
            >
                {categories.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                        {category.name}
                    </Select.Option>
                ))}
            </Select>
            <Select
                className='ant-select-selection span'
                style={{ marginTop: '0px' }}
                placeholder="Choose difficulty level"
                onChange={handleDifficultyChange}
            >
                <Select.Option value="easy">Easy</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="hard">Hard</Select.Option>
            </Select>
        </div>
    );
};
export default Category;
import { useEffect, useState } from 'react';
import { message, Select } from 'antd';
import '../App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, setSelectedCategory, setSelectedDifficulty } from "../redux/actions/quizActions";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const selectedCategory = useSelector((state) => state.selectedCategory);
    const selectedDifficulty = useSelector((state) => state.selectedDifficulty);
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

    const handleCategoryChange = (value) => {
        dispatch(setSelectedCategory(value));
        message.info(`Selected category: ${selectedCategory}`);
    };


    const handleDifficultyChange = (value) => {
        dispatch(setSelectedDifficulty(value));
        message.info(`Selected Difficulty: ${selectedDifficulty}`);
    };

    const handleMenuClick = () => {
        dispatch(fetchQuestions(setSelectedCategory, setSelectedDifficulty));
    };

    useEffect(() => {
        console.log("Arjun")
        message.info(`Selected category: ${selectedCategory}, Difficulty: ${selectedDifficulty}`);
        handleMenuClick();
    }, [selectedCategory, selectedDifficulty]);

    return (
        <div className='cat-dropdown'>
            <Select
                className='ant-select-selection span'
                placeholder="Choose Category"
                onChange={handleCategoryChange}
                value={selectedCategory}
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
                value={selectedDifficulty}
            >
                <Select.Option value="easy">Easy</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="hard">Hard</Select.Option>
            </Select>
        </div>
    );
};

export default Category;

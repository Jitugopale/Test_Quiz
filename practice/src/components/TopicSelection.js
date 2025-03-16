import React, { useState } from 'react';
import axios from 'axios';
import Logout from './Logout';

const TopicSelection = () => {
    const [topics, setTopics] = useState([]);  
    const [selectedTopic, setSelectedTopic] = useState(null); // Store selected topic
    const [questions, setQuestions] = useState([]); // Store questions for selected topic
    const [error, setError] = useState("");   
    const [loading, setLoading] = useState(false);  

    const handleTopicsSelection = async (e) => {
        e.preventDefault();
        setLoading(true);  

        try {
            const response = await axios.get('http://localhost:5000/api/select/topics'); 
            setTopics(response.data.topics); 
        } catch (err) {
            console.error("Error:", err);
            setError("Server Not Reachable");
        } finally {
            setLoading(false);
        }
    };

    const handleTopicClick = async (topic) => {
        setSelectedTopic(topic);
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/topic/${topic}`);
            setQuestions(response.data.questions);
        } catch (err) {
            console.error("Error:", err);
            setError(`No questions found for ${topic}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <h1>Select Topic</h1>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Show topics after fetching */}
     
            {/* Display list of topics */}
            {!selectedTopic && topics.length > 0 && (
                <ul>
                    {topics.map((topic, index) => (
                        <li key={index} onClick={() => handleTopicClick(topic)} style={{ cursor: 'pointer', color: 'blue' }}>
                            {topic}
                        </li>
                    ))}
                </ul>
            )}

            {/* Hide button after topics are fetched */}
            {topics.length === 0 && (
                <button 
                    type="submit" 
                    onClick={handleTopicsSelection} 
                    disabled={loading}  
                    style={{ visibility: loading ? "hidden" : "visible" }}  
                >
                    {loading ? "Fetching..." : "Select Topic"}
                </button>
            )}

            
            {/* Display questions for the selected topic */}
            {selectedTopic && (
                <div>
                    <h2>Questions for {selectedTopic}</h2>
                    {questions.length > 0 ? (
                        questions.map((q, idx) => (
                            <div key={idx} style={{ marginBottom: "20px" }}>
                                <h3>{q.question}</h3>
                                <ul>
                                    {q.options.map((option, i) => (
                                        <li key={i}>{option}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No questions available.</p>
                    )}
                    <button onClick={() => setSelectedTopic(null)}>Back to Topics</button>
                </div>
            )}

            <Logout />
        </div>
    );
};

export default TopicSelection;

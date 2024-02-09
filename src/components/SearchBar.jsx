
import { useState } from 'react';

const SearchBar = (props) => {
    const {topics} = props
    const [topicChoice, setTopicChoice] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="topic-selector"> Choose a topic</label>
            <select 
                id="topic-selector"
                value={topicChoice}
                onChange={setTopicChoice}
            >
                {topics.map((topic) => {
                    <option key={topic} value={topic}>{topic}</option>
                })}
            </select>
            <button> Select Topic </button>
        </form>

    )
}


export default SearchBar
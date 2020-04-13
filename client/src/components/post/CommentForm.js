import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../store/actions/post'
import GifSearch from "react-gif-search";


const CommentForm = ({ addComment, postId }) => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState(false);
    const [term, setTerm] = useState('')

    return (
        <div class="post-form">
            <button onClick={() => setStatus(!status)}>
                {status ? 'on' : 'off'}
            </button>
            <div className="Gif" style={!status ? { display: 'none' } : { display: 'block', animation: 'fadein 1.5s' }} >
                <GifSearch
                    className={term ? "Gif-animate" : null}
                    // A callback for when a search is actually made
                    onDidSearch={term => setTerm(term)}
                />
            </div>

            <div class="bg-primary p">
                <h3>Leave a Comment</h3>
            </div>
            <form class="form my-1" onSubmit={e => {
                e.preventDefault();
                addComment(postId, { text })
                setText('')
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>

                <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>

        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)

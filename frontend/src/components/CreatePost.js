import React from 'react';

const CreatePost = () => {
      return (
            <div className="BlocCreatePost">
                  <form className="formPost">
                        <input
                              className="inputAuth"
                              type="text"
                              id="CreatePost"
                              name="CreatePost"
                              placeholder="Exprimez vous..."
                              required
                        ></input>
                        <button className="buttonCreatePost">Envoyer</button>
                  </form>
            </div>
      );
};

export default CreatePost;

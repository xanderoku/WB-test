const initialState = {
  posts: [
    {
      title: "War and Peace",
      author: "Leo Tolstoy",
      body: "bla bla bla...",
      createdAt: new Date(1800, 0, 1, 2, 3, 4, 567),
      id: '001'
    },
    {
      title: "I go mid",
      author: "Yasuo",
      body: "Insta-pick, insta-lock, gg wp",
      createdAt: new Date(2019, 0, 1, 2, 3, 4, 567),
      id: '002'
    },
    {
      title: "Linux",
      author: "Linus",
      body:
        "Just wrote the first line of my new pet project called Linux... it's gonna be big.",
      createdAt: new Date(1991, 0, 1, 2, 3, 4, 567),
      id: '003'
    }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_POST":
      return {
        ...state,
        posts: [action.data, ...state.posts]
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      };
    case "SET_EDIT":
      return {
        ...state,
        postToEdit: action.post
      };
    case "EDIT_POST":
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.data.id) {
            return {
              ...action.data
            };
          }
          return post;
        }),
        postToEdit: undefined
      };
    default:
      return state;
  }
};

const User = (props) => {
    const {user} = props;
    return(
        <div>
            <h1>{user.username}</h1>
            <h2>{user.email}</h2>
        </div>
    )
}

export default User; 
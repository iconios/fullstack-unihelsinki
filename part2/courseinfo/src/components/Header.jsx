function Header({ head }) {
    console.log(`Course title: ${head}`);
    return (
        <h2>{head}</h2>
    );
}

export default Header
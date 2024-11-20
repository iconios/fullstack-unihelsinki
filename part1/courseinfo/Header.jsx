function Header({ course }) {
    console.log(`Course title: ${course}`);
    return (
        <h1>{course}</h1>
    );
}

export default Header
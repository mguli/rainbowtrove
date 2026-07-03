export default function CustomOrder() {
    return (
        <div>
            <h1>Custom Order</h1>
            <p>Tell us about your idea and we will get back to you with a quote.</p>
            <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Idea" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
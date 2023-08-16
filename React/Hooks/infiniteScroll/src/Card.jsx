export default function Card({ text, index }) {
    return (
        <div className="card">
            <span>{index}</span>
            <span>{text}</span>
            <span></span>
        </div>
    )
}
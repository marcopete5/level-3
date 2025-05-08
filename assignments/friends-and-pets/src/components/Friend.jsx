import Pet from './Pet';

export default function Friend({ name, age, pets }) {
    return (
        <div className="friend">
            <h2>
                {name} ({age})
            </h2>
            <ul>
                {pets.map((pet, i) => (
                    <Pet key={i} name={pet.name} breed={pet.breed} />
                ))}
            </ul>
        </div>
    );
}

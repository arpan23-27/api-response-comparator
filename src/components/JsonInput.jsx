function JsonInput({label, value, onChange}){
    return (
        <section>
            <h2>{label}</h2>

            <textarea
             value={value}
             onChange={(event) => onChange(event.target.value)}
             placeholder="Paste JSON  response here...."
             rows="15"
             />
        </section>
    );
}

export default JsonInput;
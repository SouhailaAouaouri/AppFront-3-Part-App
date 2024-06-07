import {useState} from "react";

const App: React.FC = () => {
    const [htmlCode, setHtmlCode] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHtmlCode(event.target.value);
    };

    return (
        <div className="App">
            <div className="code-section">
                <h2>Code HTML</h2>
                <textarea
                    value={htmlCode}
                    onChange={handleInputChange}
                    placeholder="Saisissez votre code HTML ici..."
                    rows={10}
                    cols={50}
                />
            </div>
            <div className="preview-section">
                <h2>Résultat</h2>
                <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
            </div>
        </div>
    );
};
export default App;
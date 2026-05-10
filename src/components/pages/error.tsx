import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";

export default function Error() {
    const navigate = useNavigate();
    const message = useParams().message || "Si è verificato un errore sconosciuto.";

    return (
        <div className="flex flex-col flex-1 min-h-0 items-center justify-center bg-[#EBF5FF] px-6">

            {/* Icona */}
            <div className="w-24 h-24 rounded-full bg-white border-2 border-[#C8E8FF] flex items-center justify-center mb-6 shadow-sm">
                <span className="text-5xl">📡</span>
            </div>

            {/* Testo */}
            <h1 className="text-2xl font-bold text-[#185FA5] text-center mb-2">
                Problema di connessione
            </h1>
            <p className="text-sm text-gray-500 text-center mb-2 leading-relaxed">
                {message}
            </p>
            <p className="text-xs text-gray-400 text-center mb-8">
                Ci scusiamo per il disagio. Riprova tra qualche istante.
            </p>

            {/* Bottone */}
            <Button
                onClick={() => navigate("/")}
                className="px-8 py-4 rounded-2xl bg-[#185FA5] hover:bg-[#144c84] text-white font-bold text-base active:scale-95 transition-all"
            >
                Torna alla home
            </Button>

        </div>
    );
}
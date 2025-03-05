
interface LetterPreviewProps {
  letter: any;
  templateId: string;
}

export default function LetterPreview({ letter, templateId }: LetterPreviewProps) {
  const renderTemplate = () => {
    switch (templateId) {
      case "template1":
        return <ClassicTemplate letter={letter} />;
      case "template2":
        return <ModernTemplate letter={letter} />;
      case "template3":
        return <CreativeTemplate letter={letter} />;
      default:
        return <ClassicTemplate letter={letter} />;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg">
        {renderTemplate()}
      </div>
    </div>
  );
}

// Template 1: Classic Design
function ClassicTemplate({ letter }: { letter: any }) {
  return (
    <div className="min-h-[297mm] flex flex-col p-8">
      {/* En-tête */}
      <div className="mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">[Votre nom]</h1>
            <p className="text-gray-600">[Votre adresse]</p>
            <p className="text-gray-600">[Votre email]</p>
            <p className="text-gray-600">[Votre téléphone]</p>
          </div>
          <div className="text-right">
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Destinataire */}
      <div className="mb-8">
        <p className="font-bold">{letter.company || "Nom de l'entreprise"}</p>
        <p>Service des Ressources Humaines</p>
        <p>[Adresse de l'entreprise]</p>
      </div>

      {/* Objet */}
      <div className="mb-8">
        <p className="font-bold">Objet : {letter.jobPosition ? `Candidature au poste de ${letter.jobPosition}` : "Candidature"}</p>
      </div>

      {/* Corps de la lettre */}
      <div className="flex-1">
        <p className="mb-6">Madame, Monsieur,</p>
        
        <div className="text-justify leading-relaxed whitespace-pre-wrap mb-8">
          {letter.content}
        </div>

        <p className="mb-8">Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

        <div className="text-right">
          <p className="font-bold">[Votre nom]</p>
          <p className="italic mt-8">[Signature]</p>
        </div>
      </div>
    </div>
  );
}

// Template 2: Modern Design
function ModernTemplate({ letter }: { letter: any }) {
  return (
    <div className="min-h-[297mm] flex flex-col">
      {/* En-tête moderne */}
      <div className="bg-primary h-32 p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">[Votre nom]</h1>
        <p>{letter.jobPosition || "Votre titre professionnel"}</p>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-sm text-gray-500 mb-1">Contact</p>
            <p>[Votre adresse]</p>
            <p>[Votre email]</p>
            <p>[Votre téléphone]</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="font-bold">{letter.company || "Nom de l'entreprise"}</p>
          <p>Service des Ressources Humaines</p>
          <p>[Adresse de l'entreprise]</p>
        </div>

        <div className="mb-8">
          <p className="font-bold">Objet : {letter.jobPosition ? `Candidature au poste de ${letter.jobPosition}` : "Candidature"}</p>
        </div>

        <div className="flex-1">
          <p className="mb-6">Madame, Monsieur,</p>
          
          <div className="text-justify leading-relaxed whitespace-pre-wrap mb-8">
            {letter.content}
          </div>

          <p className="mb-8">Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

          <div className="text-right">
            <p className="font-bold">[Votre nom]</p>
            <p className="italic mt-8">[Signature]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Template 3: Creative Design
function CreativeTemplate({ letter }: { letter: any }) {
  return (
    <div className="min-h-[297mm] flex flex-col">
      {/* En-tête créatif */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">[Votre nom]</h1>
          <p className="text-xl">{letter.jobPosition || "Votre titre professionnel"}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{
          clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)"
        }} />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Contact</p>
            <p>[Votre adresse]</p>
            <p>[Votre email]</p>
            <p>[Votre téléphone]</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="font-bold">{letter.company || "Nom de l'entreprise"}</p>
          <p>Service des Ressources Humaines</p>
          <p>[Adresse de l'entreprise]</p>
        </div>

        <div className="mb-8">
          <p className="font-bold">Objet : {letter.jobPosition ? `Candidature au poste de ${letter.jobPosition}` : "Candidature"}</p>
        </div>

        <div className="flex-1">
          <p className="mb-6">Madame, Monsieur,</p>
          
          <div className="text-justify leading-relaxed whitespace-pre-wrap mb-8">
            {letter.content}
          </div>

          <p className="mb-8">Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

          <div className="text-right">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
              <p className="font-bold">[Votre nom]</p>
              <p className="italic mt-4">[Signature]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
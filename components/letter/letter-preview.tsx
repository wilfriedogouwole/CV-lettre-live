
interface LetterPreviewProps {
  letter: any;
  templateId: string;
}

export default function LetterPreview({ letter, templateId }: LetterPreviewProps) {
  const renderTemplate = () => {
    switch (templateId) {
      case "template1":
        return <BusinessTemplate letter={letter} />;
      case "template2":
        return <MinimalTemplate letter={letter} />;
      case "template3":
        return <MedicalTemplate letter={letter} />;
      case "template4":
        return <ResignationTemplate letter={letter} />;
      case "template5":
        return <CorporateTemplate letter={letter} />;
      default:
        return <BusinessTemplate letter={letter} />;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
}

// Template 1: Business Style (basé sur le premier modèle)
function BusinessTemplate({ letter }: { letter: any }) {
  return (
    <div className="relative">
      <div className="bg-[#ffd700] h-16 flex items-center px-8">
        <div className="bg-white p-2 rounded">
          <div className="w-8 h-8 bg-primary" />
        </div>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="text-right">
          <p>{new Date().toLocaleDateString()}</p>
        </div>

        <div>
          <p className="font-bold">Cher/Chère {letter.recipient || "Responsable du recrutement"},</p>
        </div>

        <div className="whitespace-pre-wrap">{letter.content}</div>

        <div className="mt-8">
          <p>Cordialement,</p>
          <p className="font-bold mt-2">[Votre nom]</p>
          <p className="text-muted-foreground">{letter.jobPosition || "[Poste]"}</p>
          <p className="text-muted-foreground">{letter.company || "[Entreprise]"}</p>
        </div>
      </div>

      <div className="bg-[#ffd700] h-8 absolute bottom-0 left-0 right-0" />
    </div>
  );
}

// Template 2: Minimal Style (basé sur le modèle minimaliste)
function MinimalTemplate({ letter }: { letter: any }) {
  return (
    <div className="p-8 space-y-6">
      <div className="border-l-4 border-primary pl-4">
        <h1 className="text-3xl font-serif">{letter.jobPosition || "[Poste]"}</h1>
        <p className="text-muted-foreground">{letter.company || "[Entreprise]"}</p>
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          <p>Ref: {letter.reference || "LM-" + new Date().getFullYear()}</p>
        </div>
        <div>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <p>Madame, Monsieur,</p>
        <div className="whitespace-pre-wrap leading-relaxed">{letter.content}</div>
      </div>

      <div className="pt-8 mt-8 border-t">
        <p>Cordialement,</p>
        <p className="font-bold mt-2">[Votre nom]</p>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Email: [votre@email.com]</p>
          <p>Tél: [+33 6 XX XX XX XX]</p>
        </div>
      </div>
    </div>
  );
}

// Template 3: Medical Style (basé sur le modèle médical)
function MedicalTemplate({ letter }: { letter: any }) {
  return (
    <div className="bg-gradient-to-br from-[#E6F7F5] to-white">
      <div className="p-8">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">{letter.jobPosition || "[Poste]"}</h1>
            <p className="text-muted-foreground">{letter.company || "[Entreprise]"}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-6">
          <p>Madame, Monsieur,</p>
          <div className="whitespace-pre-wrap leading-relaxed">{letter.content}</div>
        </div>

        <div className="mt-12 flex justify-between items-end">
          <div>
            <p>Cordialement,</p>
            <p className="font-bold mt-2">[Votre nom]</p>
          </div>
          <div className="text-right text-sm text-primary">
            <p>[votre@email.com]</p>
            <p>[+33 6 XX XX XX XX]</p>
            <p>[Adresse]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Template 4: Resignation Style (basé sur le modèle de démission)
function ResignationTemplate({ letter }: { letter: any }) {
  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-3xl font-serif text-center mb-2">LETTRE DE MOTIVATION</h1>
        <div className="w-16 h-1 bg-primary mx-auto" />
      </div>

      <div className="mb-8">
        <p>{new Date().toLocaleDateString()}</p>
        <p className="mt-2">{letter.company || "[Entreprise]"}</p>
        <p>{letter.address || "[Adresse]"}</p>
      </div>

      <div className="space-y-6">
        <p>Madame, Monsieur,</p>
        <div className="whitespace-pre-wrap leading-relaxed">{letter.content}</div>
      </div>

      <div className="mt-12">
        <div className="w-32 h-0.5 bg-primary mb-4" />
        <p className="font-bold">[Votre nom]</p>
        <p className="text-muted-foreground">{letter.jobPosition || "[Poste]"}</p>
      </div>
    </div>
  );
}

// Template 5: Corporate Style (basé sur le modèle d'entreprise)
function CorporateTemplate({ letter }: { letter: any }) {
  return (
    <div>
      <div className="bg-gradient-to-r from-primary/90 to-primary p-8 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-xl font-bold">★</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{letter.jobPosition || "[Poste]"}</h1>
            <p className="text-white/80">{letter.company || "[Entreprise]"}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex justify-end">
          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <p>Madame, Monsieur,</p>
          <div className="whitespace-pre-wrap leading-relaxed">{letter.content}</div>
        </div>

        <div className="pt-8 mt-8 border-t flex justify-between items-end">
          <div>
            <p>Cordialement,</p>
            <p className="font-bold mt-2">[Votre nom]</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-primary font-medium mb-1">Contact</p>
            <p className="text-muted-foreground">[votre@email.com]</p>
            <p className="text-muted-foreground">[+33 6 XX XX XX XX]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
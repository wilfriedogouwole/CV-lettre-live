export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export const templates: Record<string, Template> = {
  template1: {
    
      id: "template1",
      name: "Élégant",
      description: "Un design épuré avec une mise en page moderne et élégante",
      thumbnail: "/images/nouveau_style1.jpg"
    },
    template2: 
    {
      id: "template2",
      name: "Créatif",
      description: "Un design contemporain avec des éléments graphiques modernes",
      thumbnail: "/images/nouveau_style1.jpg"
    },
    template3:{
      id: "template3",
      name: "Minimaliste",
      description: "Un design simple et efficace qui met en valeur votre contenu",
      thumbnail: "/images/nouveau_style1.jpg"
    },
    template4:{
      id: "template4",
      name: "Professionnel",
      description: "Un design structuré idéal pour les profils expérimentés",
      thumbnail: "/images/Moderne.jpg"
    },
    template5: {
      id: "template5",
      name: "Moderne",
      description: "Un design audacieux avec une mise en page originale",
      thumbnail: "/images/Moderne.jpg"
    }
    ,
    Templatenouveau:{
        id: "Template nouveau",
        name: "nouveau",
        description: "Un design avec une mise en page en deux colonnes",
        thumbnail: "/images/Moderne.jpg"
      },
    };
  
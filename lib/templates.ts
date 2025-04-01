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
      thumbnail: "/images/cv1.jpg"
    },
    template2: 
    {
      id: "template2",
      name: "Créatif",
      description: "Un design contemporain avec des éléments graphiques modernes",
      thumbnail: "/images/cv3.jpg"
    },
    template3:{
      id: "template3",
      name: "Minimaliste",
      description: "Un design simple et efficace qui met en valeur votre contenu",
      thumbnail: "/images/cv5.jpg"
    },
    template4:{
      id: "template4",
      name: "Professionnel",
      description: "Un design structuré idéal pour les profils expérimentés",
      thumbnail: "/images/cv2.jpg"
    },
    template5: {
      id: "template5",
      name: "Moderne",
      description: "Un design audacieux avec une mise en page originale",
      thumbnail: "/images/cv4.jpg"
    }
    ,
    Templatenouveau:{
        id: "Template nouveau",
        name: "nouveau",
        description: "Un design avec une mise en page en deux colonnes",
        thumbnail: "/images/cv2.jpg"
      },
    };
  
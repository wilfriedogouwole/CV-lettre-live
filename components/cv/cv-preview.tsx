"use client"

import Image from "next/image";


interface CVPreviewProps {
  cv: any;
  templateId: string;
}

export default function CVPreview({ cv, templateId }: CVPreviewProps) {
  // This would be implemented with react-pdf for actual PDF preview
  // For now, we'll just show a simple preview

  const renderTemplate = () => {
    switch (templateId) {
      case "template1":
        return <ElegantTemplate cv={cv} />;
      case "template2":
        return <CreativeTemplate cv={cv} />;
      case "template3":
        return <MinimalistTemplate cv={cv} />;
      case "template4":
        return <ProfessionalTemplate cv={cv} />;
      case "template5":
        return <ModernTemplate cv={cv} />;
      default:
        return <ElegantTemplate cv={cv} />;
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

// Template 1: Élégant (inspiré par l'image de Jessica Marie)
function ElegantTemplate({ cv }: { cv: any }) {
  return (
    <div className="p-0 bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Colonne de gauche avec fond lavande clair */}
        <div className="md:w-2/5 bg-[#E6E6FA] p-8">
          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 border-4 border-white">
              {cv.content.personalInfo.photo ? (
                <Image 
                  src={cv.content.personalInfo.photo} 
                  alt="Photo de profil" 
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Photo</div>
              )}
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-1">{cv.content.personalInfo.name || "Votre Nom"}</h1>
            <h2 className="text-xl">{cv.content.personalInfo.title || "Votre Titre"}</h2>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <span className="material-icons mr-2">📧</span>
              <span>{cv.content.personalInfo.email || "email@exemple.com"}</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-2">📱</span>
              <span>{cv.content.personalInfo.phone || "+33 6 12 34 56 78"}</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-2">📍</span>
              <span>{cv.content.personalInfo.address || "Votre adresse"}</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-2">🌐</span>
              <span>www.votresite.com</span>
            </div>
          </div>
          
          {cv.content.languages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Langues</h3>
              <div className="space-y-3">
                {cv.content.languages.map((language: any, index: number) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between">
                      <span>{language.name || "Langue"}</span>
                      <span>{language.level || "Niveau"}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                      <div 
                        className="bg-gray-600 h-2 rounded-full" 
                        style={{ 
                          width: language.level === "Débutant" ? "25%" : 
                                 language.level === "Intermédiaire" ? "50%" : 
                                 language.level === "Avancé" ? "75%" : 
                                 language.level === "Bilingue" ? "100%" : "50%" 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {cv.content.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Compétences</h3>
              <div className="space-y-3">
                {cv.content.skills.map((skill: any, index: number) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between">
                      <span>{skill.name || "Compétence"}</span>
                      <span>{skill.level || "Niveau"}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                      <div 
                        className="bg-gray-600 h-2 rounded-full" 
                        style={{ 
                          width: skill.level === "Débutant" ? "25%" : 
                                 skill.level === "Intermédiaire" ? "50%" : 
                                 skill.level === "Avancé" ? "75%" : 
                                 skill.level === "Expert" ? "100%" : "50%" 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Colonne de droite */}
        <div className="md:w-3/5 p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Profil</h3>
            <p className="text-gray-700">
              {cv.content.personalInfo.summary || "Présentez-vous en quelques lignes. Décrivez votre parcours, vos compétences clés et ce que vous recherchez."}
            </p>
          </div>
          
          {cv.content.education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Formation</h3>
              {cv.content.education.map((edu: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{edu.degree || "Diplôme"}</h4>
                      <p className="text-gray-700">{edu.institution || "Établissement"}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600">
                        {edu.startDate || "Date"} - {edu.endDate || "Date"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mt-1">{edu.description || ""}</p>
                </div>
              ))}
            </div>
          )}
          
          {cv.content.experience.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Expérience Professionnelle</h3>
              {cv.content.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{exp.position || "Poste"}</h4>
                      <p className="text-gray-700">{exp.company || "Entreprise"}{exp.location ? `, ${exp.location}` : ""}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600">
                        {exp.startDate || "Date"} - {exp.endDate || "Date"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mt-1">{exp.description || "Description du poste"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Template 2: Créatif (inspiré par l'image de Karrin Zahra)
function CreativeTemplate({ cv }: { cv: any }) {
  return (
    <div className="p-0 bg-white">
      <div className="relative">
        {/* En-tête avec cercles décoratifs */}
        <div className="p-8 relative">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#f5e6d8] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full border border-[#d4a373]"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {cv.content.personalInfo.photo ? (
                <Image
                  src={cv.content.personalInfo.photo} 
                  alt="Photo de profil" 
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">Photo</div>
              )}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold">{cv.content.personalInfo.name || "Votre Nom"}</h1>
              <h2 className="text-xl text-[#d4a373] mb-4">{cv.content.personalInfo.title || "Votre Titre"}</h2>
              
              <div className="flex flex-col space-y-1 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">📱</span>
                  <span>{cv.content.personalInfo.phone || "+33 6 12 34 56 78"}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>{cv.content.personalInfo.address || "Votre adresse"}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📧</span>
                  <span>{cv.content.personalInfo.email || "email@exemple.com"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Colonne de gauche */}
          <div className="md:w-3/5 p-8">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#d4a373] mb-4">À PROPOS DE MOI</h3>
              <p className="text-gray-700">
                {cv.content.personalInfo.summary || "Présentez-vous en quelques lignes. Décrivez votre parcours, vos compétences clés et ce que vous recherchez."}
              </p>
            </div>
            
            {cv.content.experience.length > 0 && (
              <div className="mb-8 bg-[#f9f5f0] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#d4a373] mb-4">EXPÉRIENCE</h3>
                {cv.content.experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-4 border-l-2 border-[#d4a373] pl-4">
                    <div className="flex flex-col">
                      <h4 className="font-semibold">{exp.position || "POSTE"}</h4>
                      <p className="text-sm text-gray-600">{exp.company || "Entreprise"}</p>
                      <p className="text-xs text-gray-500 mb-2">{exp.startDate || "Date"} - {exp.endDate || "Date"}</p>
                      <p className="text-sm">{exp.description || "Description du poste"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Colonne de droite */}
          <div className="md:w-2/5 p-8">
            {cv.content.skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#d4a373] mb-4">COMPÉTENCES</h3>
                <div className="grid grid-cols-1 gap-4">
                  {cv.content.skills.map((skill: any, index: number) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between mb-1">
                        <span>{skill.name || "Compétence"}</span>
                        <span className="text-[#d4a373]">{skill.level === "Débutant" ? "25%" : 
                               skill.level === "Intermédiaire" ? "50%" : 
                               skill.level === "Avancé" ? "75%" : 
                               skill.level === "Expert" ? "100%" : "50%"}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div 
                          className="bg-[#d4a373] h-2 rounded-full" 
                          style={{ 
                            width: skill.level === "Débutant" ? "25%" : 
                                   skill.level === "Intermédiaire" ? "50%" : 
                                   skill.level === "Avancé" ? "75%" : 
                                   skill.level === "Expert" ? "100%" : "50%" 
                          }}
                        ></div> <div 
                          className="bg-[#d4a373] h-2 rounded-full" 
                          style={{ 
                            width: skill.level === "Débutant" ? "25%" : 
                                   skill.level === "Intermédiaire" ? "50%" : 
                                   skill.level === "Avancé" ? "75%" : 
                                   skill.level === "Expert" ? "100%" : "50%" 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {cv.content.languages.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#d4a373] mb-4">LANGUES</h3>
                <div className="space-y-3">
                  {cv.content.languages.map((language: any, index: number) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between mb-1">
                        <span className="uppercase">{language.name || "Langue"}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full">
                        <div 
                          className="bg-[#d4a373] h-3 rounded-full" 
                          style={{ 
                            width: language.level === "Débutant" ? "25%" : 
                                   language.level === "Intermédiaire" ? "50%" : 
                                   language.level === "Avancé" ? "75%" : 
                                   language.level === "Bilingue" ? "100%" : "50%" 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {cv.content.education.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#d4a373] mb-4">FORMATION</h3>
                <div className="space-y-4">
                  {cv.content.education.map((edu: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <h4 className="font-semibold">{edu.degree || "DIPLÔME"}</h4>
                        <p className="text-sm text-gray-600">{edu.institution || "École"}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm">{edu.endDate || "Date"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Template 3: Minimaliste (inspiré par l'image d'Anne Robertson)
function MinimalistTemplate({ cv }: { cv: any }) {
  return (
    <div className="p-0 bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Colonne de gauche avec fond jaune */}
        <div className="md:w-1/3 bg-[#ffd700] p-8">
          <div className="mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-white mx-auto">
              {cv.content.personalInfo.photo ? (
                <Image
                  src={cv.content.personalInfo.photo} 
                  alt="Photo de profil" 
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Photo</div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 uppercase border-b border-black pb-2">CONTACT</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="mr-2">📍</span>
                <span>{cv.content.personalInfo.address || "Votre adresse"}</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">📱</span>
                <span>{cv.content.personalInfo.phone || "+33 6 12 34 56 78"}</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">📧</span>
                <span>{cv.content.personalInfo.email || "email@exemple.com"}</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">🌐</span>
                <span>www.votresite.com</span>
              </div>
            </div>
          </div>
          
          {cv.content.education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 uppercase border-b border-black pb-2">FORMATION</h3>
              <div className="space-y-4">
                {cv.content.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <h4 className="font-semibold">{edu.degree || "Diplôme"}</h4>
                    <p className="text-sm">{edu.institution || "Établissement"}</p>
                    <p className="text-xs">{edu.startDate || "Date"} - {edu.endDate || "Date"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {cv.content.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase border-b border-black pb-2">COMPÉTENCES</h3>
              <div className="space-y-2">
                {cv.content.skills.map((skill: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <span>{skill.name || "Compétence"}</span>
                    <div className="ml-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xs mx-px">
                          {i < (skill.level === "Débutant" ? 1 : 
                                skill.level === "Intermédiaire" ? 2 : 
                                skill.level === "Avancé" ? 4 : 
                                skill.level === "Expert" ? 5 : 3) 
                            ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Colonne de droite */}
        <div className="md:w-2/3 p-8">
          <div className="mb-8 border-b pb-4">
            <h1 className="text-4xl font-bold uppercase">{cv.content.personalInfo.name || "VOTRE NOM"}</h1>
            <h2 className="text-xl uppercase">{cv.content.personalInfo.title || "VOTRE TITRE"}</h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 uppercase border-b pb-2">EXPÉRIENCE PROFESSIONNELLE</h3>
            {cv.content.experience.length > 0 ? (
              cv.content.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{exp.startDate || "Date"} - {exp.endDate || "Présent"}</h4>
                      <p className="font-bold">{exp.position || "Poste"}</p>
                      <p>{exp.company || "Entreprise"}</p>
                    </div>
                  </div>
                  <p className="text-sm mt-2">{exp.description || "Description du poste"}</p>
                </div>
              ))
            ) : (
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">2019 - Présent</h4>
                    <p className="font-bold">Votre Poste</p>
                    <p>Nom de l&apos;Entreprise</p>
                  </div>
                </div>
                <p className="text-sm mt-2">Description de vos responsabilités et réalisations dans ce poste.</p>
              </div>
            )}
          </div>
          
          {cv.content.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase border-b pb-2">CENTRES D&apos;INTÉRÊT</h3>
              <div className="flex flex-wrap gap-2">
                {cv.content.languages.map((language: any, index: number) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {language.name || "Intérêt"}
                  </span>
                ))}
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Voyages</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Photographie</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Cuisine</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Template 4: Professionnel (inspiré par l'image de Henry Smith)
function ProfessionalTemplate({ cv }: { cv: any }) {
  return (
    <div className="p-0 bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Colonne de gauche */}
        <div className="md:w-1/3 bg-gray-100 p-8">
          <div className="mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto">
              {cv.content.personalInfo.photo ? (
                <Image 
                  src={cv.content.personalInfo.photo} 
                  alt="Photo de profil" 
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-white">Photo</div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-center">{cv.content.personalInfo.name || "HENRY SMITH"}</h1>
            <h2 className="text-lg text-center text-gray-600 mb-4">{cv.content.personalInfo.title || "ART DIRECTOR"}</h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="w-4 h-4 bg-black rounded-full mr-2"></span>
              À PROPOS DE MOI
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                <span>{cv.content.personalInfo.phone || "+33 6 12 34 56 78"}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{cv.content.personalInfo.address || "Votre adresse"}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📧</span>
                <span>{cv.content.personalInfo.email || "email@exemple.com"}</span>
              </div>
            </div>
          </div>
          
          {cv.content.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <span className="w-4 h-4 bg-black rounded-full mr-2"></span>
                RÉFÉRENCES
              </h3>
              <div className="space-y-4">
                {cv.content.skills.slice(0, 2).map((skill: any, index: number) => (
                  <div key={index} className="border-l-2 border-gray-400 pl-3">
                    <h4 className="font-semibold">Référence {index + 1}</h4>
                    <p className="text-sm">{skill.name || "Nom de la référence"}</p>
                    <p className="text-xs">+33 6 12 34 56 78</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {cv.content.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <span className="w-4 h-4 bg-black rounded-full mr-2"></span>
                LANGUES
              </h3>
              <div className="space-y-3">
                {cv.content.languages.map((language: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{language.name || "Langue"}</span>
                    <div className="flex">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full mx-px ${
                            i < (language.level === "Débutant" ? 2 : 
                                 language.level === "Intermédiaire" ? 4 : 
                                 language.level === "Avancé" ? 6 : 
                                 language.level === "Bilingue" ? 8 : 4) 
                              ? "bg-black" : "bg-gray-300"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Colonne de droite */}
        <div className="md:w-2/3 p-8">
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="w-4 h-4 bg-black rounded-full mr-2"></span>
              À PROPOS DE MOI
            </h3>
            <p className="text-gray-700">
              {cv.content.personalInfo.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."}
            </p>
          </div>
          
          {cv.content.education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <span className="w-4 h-4 bg-black rounded-full mr-2"></span>
                FORMATION
              </h3>
              <div className="space-y-4">
                {cv.content.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <h4 className="font-semibold uppercase">{edu.degree || "DIPLÔME"}</h4>
                    <p className="text-sm">{edu.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {cv.content.experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <span className="w-4 h-4 bg-black rounded-full mr-2"></span>
                EXPÉRIENCE
              </h3>
              <div className="space-y-6">
                {cv.content.experience.map((exp: any, index: number) => (
                  <div key={index} className="flex">
                    <div className="mr-4 text-right whitespace-nowrap">
                      <span className="font-semibold">{exp.startDate || "2015"}-{exp.endDate || "2017"}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold uppercase">{exp.position || "POSTE"}</h4>
                      <p className="text-sm">{exp.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {cv.content.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <span className="w-4 h-4 bg-black rounded-full mr-2"></span>
                COMPÉTENCES
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {cv.content.skills.map((skill: any, index: number) => (
                  <div key={index} className="flex flex-col">
                    <span className="uppercase">{skill.name || "COMPÉTENCE"}</span>
                    <div className="flex mt-1">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full mx-px ${
                            i < (skill.level === "Débutant" ? 2 : 
                                 skill.level === "Intermédiaire" ? 4 : 
                                 skill.level === "Avancé" ? 6 : 
                                 skill.level === "Expert" ? 8 : 4) 
                              ? "bg-black" : "bg-gray-300"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Template 5: Moderne
function ModernTemplate({ cv }: { cv: any }) {
  return (
    <div className="p-0 bg-white">
      {/* En-tête */}
      <div className="bg-blue-600 text-white p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">{cv.content.personalInfo.name || "Votre Nom"}</h1>
            <h2 className="text-xl">{cv.content.personalInfo.title || "Votre Titre"}</h2>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p>{cv.content.personalInfo.phone || "+33 6 12 34 56 78"}</p>
            <p>{cv.content.personalInfo.email || "email@exemple.com"}</p>
            <p>{cv.content.personalInfo.address || "Votre adresse"}</p>
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne de gauche */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Profil</h3>
              <p className="text-gray-700">
                {cv.content.personalInfo.summary || "Présentez-vous en quelques lignes. Décrivez votre parcours, vos compétences clés et ce que vous recherchez."}
              </p>
            </div>
            
            {cv.content.experience.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Expérience Professionnelle</h3>
                {cv.content.experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-6">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h4 className="font-semibold text-lg">{exp.position || "Poste"}</h4>
                      <span className="text-gray-600">{exp.startDate || "Date"} - {exp.endDate || "Présent"}</span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{exp.company || "Entreprise"}{exp.location ? `, ${exp.location}` : ""}</p>
                    <p className="text-gray-700">{exp.description || "Description du poste"}</p>
                  </div>
                ))}
              </div>
            )}
            
            {cv.content.education.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Formation</h3>
                {cv.content.education.map((edu: any, index: number) => (
                  <div key={index} className="mb-4">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h4 className="font-semibold">{edu.degree || "Diplôme"}</h4>
                      <span className="text-gray-600">{edu.startDate || "Date"} - {edu.endDate || "Date"}</span>
                    </div>
                    <p className="text-blue-600 font-medium">{edu.institution || "Établissement"}{edu.location ? `, ${edu.location}` : ""}</p>
                    <p className="text-gray-700">{edu.description || ""}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Colonne de droite */}
          <div>
            <div className="mb-8 flex justify-center">
              {cv.content.personalInfo.photo ? (
                <Image
                  src={cv.content.personalInfo.photo} 
                  alt="Photo de profil"
                  width={250}
                  height={250}
                  className="w-40 h-40 object-cover rounded-full border-4 border-blue-100"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <span className="text-4xl font-bold">
                    {cv.content.personalInfo.name ? cv.content.personalInfo.name.charAt(0) : "?"}
                  </span>
                </div>
              )}
            </div>
            
            {cv.content.skills.length > 0 && (
              <div className="mb-8 bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Compétences</h3>
                <div className="space-y-4">
                  {cv.content.skills.map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name || "Compétence"}</span>
                        <span>{skill.level || "Niveau"}</span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 rounded-full">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: skill.level === "Débutant" ? "25%" : 
                                   skill.level === "Intermédiaire" ? "50%" : 
                                   skill.level === "Avancé" ? "75%" : 
                                   skill.level === "Expert" ? "100%" : "50%" 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {cv.content.languages.length > 0 && (
              <div className="mb-8 bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Langues</h3>
                <div className="space-y-3">
                  {cv.content.languages.map((language: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{language.name || "Langue"}</span>
                        <span>{language.level || "Niveau"}</span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 rounded-full">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: language.level === "Débutant" ? "25%" : 
                                   language.level === "Intermédiaire" ? "50%" : 
                                   language.level === "Avancé" ? "75%" : 
                                   language.level === "Bilingue" ? "100%" : "50%" 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Centres d&apos;intérêt</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Voyages</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Photographie</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Cuisine</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Sport</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Lecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
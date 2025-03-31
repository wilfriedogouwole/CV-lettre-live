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
      case "template nouveau":
        return <NewModernTemplate cv={cv} />;
      default:
        return <ElegantTemplate cv={cv} />;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
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

function NewModernTemplate2({ cv }: { cv: any }) {
  return (
    <div className="relative bg-white min-h-[29,7cm] min-w-[210mm]">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6E6FA] rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#E6E6FA] opacity-20"></div>

      <div className="grid grid-cols-12 gap-2 p-4">
        {/* Left Column */}
        <div className="col-span-5 bg-[#E6E6FA] bg-opacity-20 p-8 rounded-lg">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-8 border-white shadow-lg">
              {cv.content.personalInfo.photo ? (
                <Image 
                src={cv.content.personalInfo.photo} 
                alt="Photo de profil" 
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-4xl font-serif text-gray-400">
                    {cv.content.personalInfo.name ? cv.content.personalInfo.name.charAt(0) : "J"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif mb-2">{cv.content.personalInfo.name || "Jessica Marie"}</h1>
            <h2 className="text-xl text-gray-600 font-light">{cv.content.personalInfo.title || "Web Designer"}</h2>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center space-x-3">
              <span>📧</span>
              <span className="text-gray-700">{cv.content.personalInfo.email || "name@company.com"}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>🏠</span>
              <span className="text-gray-700">{cv.content.personalInfo.address || "Street Avenue 90"}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>📱</span>
              <span className="text-gray-700">{cv.content.personalInfo.phone || "+09-8209-283-038"}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>🌐</span>
              <span className="text-gray-700">www.yourcompany.com</span>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h3 className="text-xl font-serif mb-6">Language</h3>
            <div className="space-y-4">
              {cv.content.languages.map((language: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{language.name || "English"}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1 rounded-full">
                    <div 
                      className="bg-[#E6E6FA] h-1 rounded-full" 
                      style={{ 
                        width: language.level === "Débutant" ? "25%" : 
                               language.level === "Intermédiaire" ? "50%" : 
                               language.level === "Avancé" ? "75%" : 
                               language.level === "Bilingue" ? "100%" : "75%" 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-7 p-8">
          {/* Profile */}
          <div className="mb-12">
            <h3 className="text-xl font-serif mb-4 inline-block bg-[#E6E6FA] bg-opacity-30 px-4 py-1">Profile</h3>
            <p className="text-gray-600 leading-relaxed">
              {cv.content.personalInfo.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam quis nostrud exerci tationwlsa ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."}
            </p>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h3 className="text-xl font-serif mb-6 inline-block bg-[#E6E6FA] bg-opacity-30 px-4 py-1">Education</h3>
            <div className="space-y-6">
              {cv.content.education.map((edu: any, index: number) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-lg">{edu.degree || "Bachelor Degree"} <span className="text-gray-500">({edu.startDate || "2011"} - {edu.endDate || "2015"})</span></h4>
                  <p className="text-gray-600 mb-2">{edu.institution || "University of Web Design"}</p>
                  <p className="text-gray-500 text-sm">{edu.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam nonummy nibh euismod tincidunt ut laoreet dolores ea commagna aliquam erat volutpat."}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-12">
            <h3 className="text-xl font-serif mb-6 inline-block bg-[#E6E6FA] bg-opacity-30 px-4 py-1">Work Experience</h3>
            <div className="space-y-6">
              {cv.content.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-lg">{exp.position || "Junior Web Designer"} <span className="text-gray-500">({exp.startDate || "2017"} - {exp.endDate || "2018"})</span></h4>
                  <p className="text-gray-600 mb-2">{exp.company || "Startup Company"}</p>
                  <p className="text-gray-500 text-sm">{exp.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam nonummy nibh euismod tincidunt ut laoreet dolores ea commagna aliquam erat volutpat."}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-serif mb-6 inline-block bg-[#E6E6FA] bg-opacity-30 px-4 py-1">Skills</h3>
            <div className="grid grid-cols-2 gap-6">
              {cv.content.skills.map((skill: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{skill.name || "HTML"}</span>
                  </div>
                  <div className="w-full bg-black-200 h-1 rounded-full">
                    <div 
                      className="bg-[#E6E6FA] h-1 rounded-full" 
                      style={{ 
                        width: skill.level === "Débutant" ? "25%" : 
                               skill.level === "Intermédiaire" ? "50%" : 
                               skill.level === "Avancé" ? "75%" : 
                               skill.level === "Expert" ? "100%" : "75%" 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function NewModernTemplate3({ cv }: { cv: any }) {
  return (
    <div className="relative bg-white min-h-[29.7cm] min-w-[21cm] p-12">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gray-300"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6E6FA] rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#E6E6FA] opacity-30"></div>

      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif mb-2 uppercase">{cv.content.personalInfo.name || "LIZZIE JOHAN"}</h1>
        <h2 className="text-xl text-gray-600 font-light tracking-widest">GRAPHIC DESIGNER</h2>
      </div>

      {/* Expérience */}
      <div className="mb-10">
        <h3 className="text-xl font-serif mb-6 border-b-2 border-gray-300 pb-2 uppercase">Experience</h3>
        {cv.content.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-6">
            <h4 className="font-medium text-lg">
              {exp.position || "POSITION TITLE"} 
              <span className="text-gray-500 font-normal"> ({exp.startDate || "2004"} - {exp.endDate || "2006"})</span>
            </h4>
            <p className="text-gray-600 mb-2 italic">{exp.company || "Company Name"}</p>
            <p className="text-gray-500">{exp.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}</p>
          </div>
        ))}
      </div>

      {/* Éducation */}
      <div className="mb-10">
        <h3 className="text-xl font-serif mb-6 border-b-2 border-gray-300 pb-2 uppercase">Education</h3>
        {cv.content.education.map((edu: any, index: number) => (
          <div key={index} className="mb-6">
            <h4 className="font-medium text-lg">
              {edu.degree || "BACHELOR ECONOMIC"}
              <span className="text-gray-500 font-normal"> ({edu.startDate || "2004"} - {edu.endDate || "2006"})</span>
            </h4>
            <p className="text-gray-600 mb-2 italic">{edu.institution || "University Name"}</p>
            <p className="text-gray-500">{edu.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}</p>
          </div>
        ))}
      </div>

      {/* Compétences */}
      <div className="mb-10">
        <h3 className="text-xl font-serif mb-6 border-b-2 border-gray-300 pb-2 uppercase">Skills</h3>
        <div className="grid grid-cols-2 gap-4">
          {cv.content.skills.map((skill: any, index: number) => (
            <div key={index} className="text-gray-600">
              • {skill.name || "WEB DESIGN"}
            </div>
          ))}
        </div>
      </div>

      {/* À propos */}
      <div className="mb-10">
        <h3 className="text-xl font-serif mb-6 border-b-2 border-gray-300 pb-2 uppercase">About me</h3>
        <p className="text-gray-500 leading-relaxed">
          {cv.content.personalInfo.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam nonummy..."}
        </p>
      </div>

      {/* Récompenses */}
      <div className="mb-10">
        <h3 className="text-xl font-serif mb-6 border-b-2 border-gray-300 pb-2 uppercase">Award</h3>
        {cv.content.awards?.map((award: any, index: number) => (
          <div key={index} className="mb-6">
            <h4 className="font-medium text-lg">
              {award.name || "BEST FREELANCE"} 
              <span className="text-gray-500 font-normal"> ({award.year || "2019-2018"})</span>
            </h4>
            <p className="text-gray-500">{award.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-12">
        <h3 className="text-xl font-serif mb-6 border-b-2 border-gray-300 pb-2 uppercase">Contact</h3>
        <div className="text-gray-600 space-y-2">
          <p>Address: {cv.content.personalInfo.address || "128 Fish Street, Your City 26300"}</p>
          <p>Phone: {cv.content.personalInfo.phone || "012 349 0799"}</p>
          <p>Email: {cv.content.personalInfo.email || "your@email.com"}</p>
          <p>Website: www.yourcompany.com</p>
        </div>
      </div>
    </div>
  );
}

function NewModernTemplate4({ cv }: { cv: any }) {
  return (
    <div className="relative bg-white min-h-[29.7cm] min-w-[21cm] p-12 font-sans">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-gray-800"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#f0f0f5] rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#f0f0f5]"></div>

      {/* En-tête */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-bold uppercase tracking-wider mb-2">LIZZIE JOHAN</h1>
        <h2 className="text-xl text-gray-600 letter-spacing-4 uppercase">GRAPHIC DESIGNER</h2>
      </div>

      {/* Colonnes conteneur */}
      <div className="flex gap-12">
        {/* Colonne gauche */}
        <div className="w-1/3 space-y-10">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 border-b-2 border-gray-800 pb-2">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>128 Fish Street</li>
              <li>Your City 26300</li>
              <li>012 349 0799</li>
              <li>your@email.com</li>
              <li>www.yourcompany.com</li>
            </ul>
          </div>

          {/* Compétences */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 border-b-2 border-gray-800 pb-2">Skills</h3>
            <ul className="space-y-2 text-sm">
              {cv.content.skills.map((skill: any) => (
                <li key={skill.name}>• {skill.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="w-2/3 space-y-10">
          {/* Expérience */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-6 border-b-2 border-gray-800 pb-2">Experience</h3>
            <div className="space-y-6">
              {cv.content.experience.map((exp: any) => (
                <div key={exp.position}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-base">{exp.position}</h4>
                    <span className="text-gray-600 text-sm">({exp.startDate} - {exp.endDate})</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Éducation */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-6 border-b-2 border-gray-800 pb-2">Education</h3>
            <div className="space-y-6">
              {cv.content.education.map((edu: any) => (
                <div key={edu.degree}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-base">{edu.degree}</h4>
                    <span className="text-gray-600 text-sm">({edu.startDate} - {edu.endDate})</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Récompenses */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-6 border-b-2 border-gray-800 pb-2">Award</h3>
            <div className="space-y-6">
              {cv.content.awards?.map((award: any) => (
                <div key={award.name}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-base">{award.name}</h4>
                    <span className="text-gray-600 text-sm">({award.year})</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section About Me en bas */}
      <div className="mt-16 pt-8 border-t-2 border-gray-300">
        <h3 className="text-lg font-bold uppercase mb-4">About me</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {cv.content.personalInfo.summary}
        </p>
      </div>
    </div>
  );
}


function NewModernTemplate5({ cv }: { cv: any }) {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Sidebar - Dark Background */}
      <div className="w-1/3 bg-black text-white p-8">
        {/* About Me Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">ABOUT ME</h2>
          <p className="text-sm text-gray-300">
            {cv.content.personalInfo.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </p>
        </div>

        {/* Awards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">AWARD</h2>
          {cv.content.awards && cv.content.awards.map((award: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{award.name || "Best Freelance"}</h3>
              <p className="text-sm text-gray-300">{award.year || "2009-2020"}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CONTACT</h2>
          <div className="space-y-2 text-sm">
            <p>📍 {cv.content.personalInfo.address || "Address 123 Main Street"}</p>
            <p>📞 {cv.content.personalInfo.phone || "012 345 6789"}</p>
            <p>✉️ {cv.content.personalInfo.email || "your@email.com"}</p>
            <p>🌐 {cv.content.personalInfo.website || "www.yourcompany.com"}</p>
          </div>
        </div>
      </div>

      {/* Right Content - White Background */}
      <div className="w-2/3 bg-white p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold">{cv.content.personalInfo.name || "LIZZIE JOHAN"}</h1>
          <h2 className="text-2xl text-gray-600 mt-2">
            {cv.content.personalInfo.title || "GRAPHIC DESIGNER"}
          </h2>
        </div>

        {/* Experience Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-yellow-500 pb-2">EXPERIENCE</h2>
          {cv.content.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-6 relative pl-8">
              <div className="absolute left-0 top-1 w-4 h-4 bg-yellow-500 rounded-full"></div>
              <h3 className="font-semibold text-lg">{exp.position || "Position Title"} ({exp.startDate || "2004-2006"})</h3>
              <p className="text-gray-600">{exp.company || "Company Name"}</p>
              <p className="text-sm text-gray-500">{exp.description || "Lorem ipsum description"}</p>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-yellow-500 pb-2">EDUCATION</h2>
          {cv.content.education.map((edu: any, index: number) => (
            <div key={index} className="mb-6 relative pl-8">
              <div className="absolute left-0 top-1 w-4 h-4 bg-yellow-500 rounded-full"></div>
              <h3 className="font-semibold text-lg">{edu.degree || "Bachelor Degree"} ({edu.startDate || "2004-2006"})</h3>
              <p className="text-gray-600">{edu.institution || "University Name"}</p>
              <p className="text-sm text-gray-500">{edu.description || "Lorem ipsum description"}</p>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-yellow-500 pb-2">SKILLS</h2>
          <div className="grid grid-cols-2 gap-4">
            {cv.content.skills.map((skill: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name || "Skill Name"}</span>
                  <span>
                    {skill.level === "Débutant" ? "25%" : 
                     skill.level === "Intermédiaire" ? "50%" : 
                     skill.level === "Avancé" ? "75%" : 
                     skill.level === "Expert" ? "100%" : "75%"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ 
                      width: skill.level === "Débutant" ? "25%" : 
                             skill.level === "Intermédiaire" ? "50%" : 
                             skill.level === "Avancé" ? "75%" : 
                             skill.level === "Expert" ? "100%" : "75%" 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function NewModernTemplate6({ cv }: { cv: any }) {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-black text-white p-8 relative">
        {/* Profile Photo */}
        <div className="absolute top-0 right-0 w-1/2 h-48 bg-yellow-500 transform skew-x-[-15deg] origin-top-right"></div>
        <div className="relative z-10 mb-8 flex justify-center">
          {cv.content.personalInfo.photo ? (
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white">
              <Image 
                src={cv.content.personalInfo.photo} 
                alt="Profile Picture" 
                width={192} 
                height={192} 
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center text-4xl">
              {cv.content.personalInfo.name ? cv.content.personalInfo.name.charAt(0) : "B"}
            </div>
          )}
        </div>

        {/* Contact Me Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">📞</span> CONTACT ME
          </h2>
          <div className="space-y-2 text-sm">
            <p>📱 {cv.content.personalInfo.phone || "+7-310-310-5588"}</p>
            <p>✉️ {cv.content.personalInfo.email || "yourinfo@email.com"}</p>
            <p>🌐 {cv.content.personalInfo.website || "www.yourwebsite.com"}</p>
            <p>📍 {cv.content.personalInfo.address || "769 Prudence Street, Lincoln Park, MI 48146"}</p>
          </div>
        </div>

        {/* References Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">👥</span> REFERENCES
          </h2>
          {cv.content.references && cv.content.references.map((ref: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{ref.name || "Darwin B. Magana"}</h3>
              <p className="text-sm text-gray-300">{ref.company || "2813 Shobe Lane Mancos, CO"}</p>
              <p className="text-sm">📞 {ref.phone || "+1-970-533-3393"}</p>
              <p className="text-sm">✉️ {ref.email || "www.yourwebsite.com"}</p>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">🎓</span> EDUCATION
          </h2>
          {cv.content.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{edu.institution || "Stanford University"}</h3>
              <p className="text-sm text-gray-300">{edu.degree || "Master Degree Graduate"}</p>
              <p className="text-sm">{edu.startDate || "2011"} - {edu.endDate || "2013"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="w-2/3 bg-white p-8 relative">
        {/* Yellow accent triangle */}
        <div className="absolute bottom-0 right-0 w-1/3 h-48 bg-yellow-50 transform skew-x-[deg] origin-bottom-right"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold">
              {cv.content.personalInfo.name || "BRIAN R. BAXTER"}
            </h1>
            <h2 className="text-2xl text-gray-600 mt-2">
              {cv.content.personalInfo.title || "GRAPHIC & WEB DESIGNER"}
            </h2>
          </div>

          {/* About Me Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-yellow-500 pb-2">ABOUT ME</h2>
            <p className="text-gray-600">
              {cv.content.personalInfo.summary || "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            </p>
          </div>

          {/* Job Experience Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-yellow-500 pb-2">JOB EXPERIENCE</h2>
            {cv.content.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{exp.position || "Senior Web Designer"}</h3>
                  <span className="text-sm text-gray-500">{exp.startDate || "2020"} - {exp.endDate || "Present"}</span>
                </div>
                <p className="text-gray-600">{exp.company || "Creative Agency / Chicago"}</p>
                <p className="text-sm text-gray-500">
                  {exp.description || "Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."}
                </p>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-yellow-500 pb-2">SKILLS</h2>
            <div className="grid grid-cols-2 gap-4">
              {cv.content.skills.map((skill: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name || "Adobe Photoshop"}</span>
                    <span>
                      {skill.level === "Débutant" ? "25%" : 
                       skill.level === "Intermédiaire" ? "50%" : 
                       skill.level === "Avancé" ? "75%" : 
                       skill.level === "Expert" ? "100%" : "75%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ 
                        width: skill.level === "Débutant" ? "25%" : 
                               skill.level === "Intermédiaire" ? "50%" : 
                               skill.level === "Avancé" ? "75%" : 
                               skill.level === "Expert" ? "100%" : "75%" 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function NewModernTemplate7({ cv }: { cv: any }) {
  return (
    <div className="min-h-screen font-sans p-8 relative bg-white">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6E6FA] rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E6E6FA] rounded-tr-full opacity-50"></div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center p-8 border-b border-gray-200">
          {/* Profile Photo */}
          <div className="w-32 h-32 rounded-full overflow-hidden mr-8">
            {cv.content.personalInfo.photo ? (
              <Image 
                src={cv.content.personalInfo.photo} 
                alt="Profile Picture" 
                width={128} 
                height={128} 
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-3xl">
                {cv.content.personalInfo.name ? cv.content.personalInfo.name.charAt(0) : "K"}
              </div>
            )}
          </div>

          {/* Name and Title */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {cv.content.personalInfo.name || "Karrin Zahra"}
            </h1>
            <h2 className="text-xl text-gray-600">
              {cv.content.personalInfo.title || "Graphic Designer"}
            </h2>

            {/* Contact Information */}
            <div className="mt-4 flex space-x-4">
              <span>📱 {cv.content.personalInfo.phone || "+1 234 567 8900"}</span>
              <span>✉️ {cv.content.personalInfo.email || "karrin.zahra@email.com"}</span>
              <span>📍 {cv.content.personalInfo.address || "Your City, Country"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 p-8">
          {/* Left Column: About Me */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">ABOUT ME</h3>
            <p className="text-gray-600 text-sm">
              {cv.content.personalInfo.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>

            {/* Languages */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">LANGUAGES</h3>
              {cv.content.languages.map((lang: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{lang.name || "Language"}</span>
                    <span>
                      {lang.level === "Débutant" ? "25%" : 
                       lang.level === "Intermédiaire" ? "50%" : 
                       lang.level === "Avancé" ? "75%" : 
                       lang.level === "Bilingue" ? "100%" : "75%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="bg-[#D2B48C] h-2 rounded-full" 
                      style={{ 
                        width: lang.level === "Débutant" ? "25%" : 
                               lang.level === "Intermédiaire" ? "50%" : 
                               lang.level === "Avancé" ? "75%" : 
                               lang.level === "Bilingue" ? "100%" : "75%" 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience and Skills */}
          <div className="col-span-2">
            {/* Experience Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">EXPERIENCE</h3>
              {cv.content.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-6 pl-4 relative">
                  <div className="absolute left-0 top-1 w-3 h-3 bg-[#D2B48C] rounded-full"></div>
                  <div className="flex justify-between">
                    <h4 className="font-medium text-lg">{exp.position || "Job Position"}</h4>
                    <span className="text-sm text-gray-500">
                      {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                    </span>
                  </div>
                  <p className="text-gray-600">{exp.company || "Company Name"}</p>
                  <p className="text-sm text-gray-500">
                    {exp.description || "Job responsibilities and achievements"}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">SKILLS</h3>
              <div className="grid grid-cols-3 gap-4">
                {cv.content.skills.map((skill: any, index: number) => (
                  <div key={index} className="text-center">
                    <div 
                      className="mx-auto w-20 h-20 rounded-full border-4 border-[#D2B48C] flex items-center justify-center text-lg font-bold"
                      style={{
                        background: `conic-gradient(#D2B48C ${
                          skill.level === "Débutant" ? "25%" : 
                          skill.level === "Intermédiaire" ? "50%" : 
                          skill.level === "Avancé" ? "75%" : 
                          skill.level === "Expert" ? "100%" : "75%"
                        } transparent 0deg)`
                      }}
                    >
                      {skill.level === "Débutant" ? "25%" : 
                       skill.level === "Intermédiaire" ? "50%" : 
                       skill.level === "Avancé" ? "75%" : 
                       skill.level === "Expert" ? "100%" : "75%"}
                    </div>
                    <p className="mt-2 text-sm">{skill.name || "Skill Name"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="border-t border-gray-200 p-4 text-center">
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-[#D2B48C]">🌐</a>
            <a href="#" className="text-gray-600 hover:text-[#D2B48C]">🐦</a>
            <a href="#" className="text-gray-600 hover:text-[#D2B48C]">📸</a>
          </div>
        </div>
      </div>
    </div>
  );
}


function NewModernTemplate({ cv }: { cv: any }) {
  return (
    <div className="min-h-screen font-sans p-8 relative bg-white">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6E6FA] rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E6E6FA] rounded-tr-full opacity-50"></div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center p-8 border-b border-gray-200">
         

          {/* Name and Title */}
          <div>
          

          
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10 p-8">
          {/* Left Column: About Me */}
          <div className="flex flex-col justify-center items-center mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
              {cv.content.personalInfo.name || "Karrin Zahra"}
            </h1>
            <h2 className="text-xl text-gray-600 text-center pb-5">
              {cv.content.personalInfo.title || "Graphic Designer"}
            </h2>

        {/* Profile Photo */}
        <div className="w-32 h-32 rounded-full overflow-hidden mr-8 ">
  
            {cv.content.personalInfo.photo ? (
              <Image 
                src={cv.content.personalInfo.photo} 
                alt="Profile Picture" 
                width={128} 
                height={128} 
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-3xl">
                {cv.content.personalInfo.name ? cv.content.personalInfo.name.charAt(0) : "K"}
              </div>
            )}
          </div>

            {/* Contact Information */}
            <div className="">
              <span className="">📱 {cv.content.personalInfo.phone || "+1 234 567 8900"}</span><br/>
              <span className="">✉️ {cv.content.personalInfo.email || "karrin.zahra@email.com"}</span><br/>
              <span className="">📍 {cv.content.personalInfo.address || "Your City, Country"}</span>
            </div>


            {/* EDUCATION */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">EDUCATION</h3>
              {cv.content.languages.map((lang: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{lang.name || "Language"}</span>
                    <span>
                      {lang.level === "Débutant" ? "25%" : 
                       lang.level === "Intermédiaire" ? "50%" : 
                       lang.level === "Avancé" ? "75%" : 
                       lang.level === "Bilingue" ? "100%" : "75%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="bg-[#D2B48C] h-2 rounded-full" 
                      style={{ 
                        width: lang.level === "Débutant" ? "25%" : 
                               lang.level === "Intermédiaire" ? "50%" : 
                               lang.level === "Avancé" ? "75%" : 
                               lang.level === "Bilingue" ? "100%" : "75%" 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

                {/* REFERENCES */}
                <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">REFERENCES</h3>
              {cv.content.languages.map((lang: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{lang.name || "Language"}</span>
                    <span>
                      {lang.level === "Débutant" ? "25%" : 
                       lang.level === "Intermédiaire" ? "50%" : 
                       lang.level === "Avancé" ? "75%" : 
                       lang.level === "Bilingue" ? "100%" : "75%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="bg-[#D2B48C] h-2 rounded-full" 
                      style={{ 
                        width: lang.level === "Débutant" ? "25%" : 
                               lang.level === "Intermédiaire" ? "50%" : 
                               lang.level === "Avancé" ? "75%" : 
                               lang.level === "Bilingue" ? "100%" : "75%" 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>*


          </div>

          {/* Right Column: Experience and Skills */}
          <div className="col-span-2">
            {/* Experience Section */}
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">A PROPOS DE MOI</h3>
            <p className="text-gray-600 text-sm">
              {cv.content.personalInfo.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
            <div className="mb-8 mt-8">
              <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">JOB EXPERIENCE</h3>
              {cv.content.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-6 pl-4 relative">
                  <div className="absolute left-0 top-1 w-3 h-3 bg-[#D2B48C] rounded-full"></div>
                  <div className="flex justify-between">
                    <h4 className="font-medium text-lg">{exp.position || "Job Position"}</h4>
                    <span className="text-sm text-gray-500">
                      {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                    </span>
                  </div>
                  <p className="text-gray-600">{exp.company || "Company Name"}</p>
                  <p className="text-sm text-gray-500">
                    {exp.description || "Job responsibilities and achievements"}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">SKILLS</h3>
              <div className="grid grid-cols-3 gap-4">
                {cv.content.skills.map((skill: any, index: number) => (
                  <div key={index} className="text-center">
                    <div 
                      className="mx-auto w-20 h-20 rounded-full border-4 border-[#D2B48C] flex items-center justify-center text-lg font-bold"
                      style={{
                        background: `conic-gradient(#D2B48C ${
                          skill.level === "Débutant" ? "25%" : 
                          skill.level === "Intermédiaire" ? "50%" : 
                          skill.level === "Avancé" ? "75%" : 
                          skill.level === "Expert" ? "100%" : "75%"
                        } transparent 0deg)`
                      }}
                    >
                      {skill.level === "Débutant" ? "25%" : 
                       skill.level === "Intermédiaire" ? "50%" : 
                       skill.level === "Avancé" ? "75%" : 
                       skill.level === "Expert" ? "100%" : "75%"}
                    </div>
                    <p className="mt-2 text-sm">{skill.name || "Skill Name"}</p>
                  </div>
                ))}



<div className="grid grid-cols-2 gap-8  ">

{/* Languages */}
<div className="mt-8">
  <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">LANGUAGES</h3>
  {cv.content.languages.map((lang: any, index: number) => (
    <div key={index} className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{lang.name || "Language"}</span>
        <span>
          {lang.level === "Débutant" ? "25%" : 
           lang.level === "Intermédiaire" ? "50%" : 
           lang.level === "Avancé" ? "75%" : 
           lang.level === "Bilingue" ? "100%" : "75%"}
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div 
          className="bg-[#D2B48C] h-2 rounded-full" 
          style={{ 
            width: lang.level === "Débutant" ? "25%" : 
                   lang.level === "Intermédiaire" ? "50%" : 
                   lang.level === "Avancé" ? "75%" : 
                   lang.level === "Bilingue" ? "100%" : "75%" 
          }}
        ></div>
      </div>
    </div>
  ))}
</div>

{/* HOBBIES */}
<div className="mt-8">
  <h3 className="text-xl font-semibold mb-4 border-b-2 border-[#D2B48C] pb-2">HOBBIES</h3>
  {cv.content.languages.map((lang: any, index: number) => (
    <div key={index} className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{lang.name || "Language"}</span>
        <span>
          {lang.level === "Débutant" ? "25%" : 
           lang.level === "Intermédiaire" ? "50%" : 
           lang.level === "Avancé" ? "75%" : 
           lang.level === "Bilingue" ? "100%" : "75%"}
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div 
          className="bg-[#D2B48C] h-2 rounded-full" 
          style={{ 
            width: lang.level === "Débutant" ? "25%" : 
                   lang.level === "Intermédiaire" ? "50%" : 
                   lang.level === "Avancé" ? "75%" : 
                   lang.level === "Bilingue" ? "100%" : "75%" 
          }}
        ></div>
      </div>
    </div>
  ))}
</div>

</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="border-t border-gray-200 p-4 text-center">
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-[#D2B48C]">🌐</a>
            <a href="#" className="text-gray-600 hover:text-[#D2B48C]">🐦</a>
            <a href="#" className="text-gray-600 hover:text-[#D2B48C]">📸</a>
          </div>
        </div>
      </div>
    </div>
  );
}



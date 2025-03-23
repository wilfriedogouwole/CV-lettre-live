import { FileText } from 'lucide-react';
import Link from 'next/link';

export function Footer() {

    return (
<div className="bg-muted py-12">
<div className="container mx-auto px-4 ">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div>
      <Link href="/" className="flex justify-center items-center space-x-2 mb-4">
        <FileText className="h-6 w-6" />
        <span className="font-bold text-xl">CV Master</span>
      </Link>
      <p className=" text-center text-muted-foreground text-sm">
        Créez des CV et des lettres de motivation <br/> professionnels pour décrocher <br/>l&apos;emploi de vos rêves.
      </p>
    </div>
    
    <div className="flex flex-col items-center justify-center">
      <h3 className="font-semibold mb-4 text-center">Produits</h3>
      <ul className="space-y-3 ">
        <li className="flex flex-col items-center"><Link href="/cv-templates" className="text-sm text-muted-foreground hover:text-foreground">Modèles de CV</Link></li>
        <li className="flex flex-col items-center"><Link href="/cover-letters" className="text-sm text-muted-foreground hover:text-foreground">Lettres de motivation</Link></li>
        <li className="flex flex-col items-center"><Link href="/conseils" className="text-sm text-muted-foreground hover:text-foreground">Conseils de carrière</Link></li>
      </ul>
    </div>
    
    <div>
      <h3 className="font-semibold mb-4 text-center">Ressources</h3>
      <ul className="space-y-3">
        <li className="flex flex-col items-center"><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
        <li className="flex flex-col items-center"><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
        <li className="flex flex-col items-center"><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
      </ul>
    </div>
    
    <div>
      <h3 className="font-semibold mb-4  text-center">Légal</h3>
      <ul className="space-y-3">
        <li className="flex flex-col items-center"><Link href="/conditions" className="text-sm text-muted-foreground hover:text-foreground">Conditions d&apos;utilisation</Link></li>
        <li className="flex flex-col items-center"><Link href="/confidentialite" className="text-sm text-muted-foreground hover:text-foreground">Politique de confidentialité</Link></li>
        <li className="flex flex-col items-center"><Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">Politique de cookies</Link></li>
      </ul>
    </div>
  </div>
  
  <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-center items-center">
    <p className="text-sm text-muted-foreground text-center ">
      © {new Date().getFullYear()} CV Master. Tous droits réservé<s className=""></s>
    </p>
  </div>
</div>
</div>  
)
}
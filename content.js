/* Contenu du journal. Marqueurs : "§" en tête = passage occulte (lueur violette),
   **gras**, *italique*. Objets : {note}, {h}, {list}, {todo}, {guardians:true}, {sign}. */

const ENTRIES = [
{ id:'prologue', num:'Prologue', title:'À Iroh', body:[
`Iroh.`,
`Si tu lis ces lignes, c'est que j'ai cessé d'exister, exactement au moment que j'avais prévu. Ne cherche aucun regret dans ce journal, tu n'en trouveras pas. Chaque pas que j'ai fait depuis le jour où Harkness a fui devant moi avait une fonction. Celui-ci aussi.`,
`Tu m'as souvent trouvé distant. Tu avais raison. On ne confie pas une vérité à quelqu'un qui n'est pas encore capable de la porter. Alors j'ai attendu, et j'ai observé. Ta détermination est parfois maladroite, parfois enfantine. Elle m'a rappelé quelqu'un. C'est pour cela que ce sera toi.`,
`Comprends bien ce que tu tiens. Ce n'est pas un souvenir. Ce n'est pas un cadeau. Un Monarque ne naît pas d'un rang, il naît d'une transcendance, et la mienne ne peut se transmettre que d'une seule manière : par le savoir. Tout ce que je sais est ici. Les rangs, les rituels, les trois étages du monde, les cœurs, les pactes que personne ne sait avoir signés. Et l'Architecte. Surtout l'Architecte.`,
`Ce journal est ton ascension. C'est aussi ton fardeau.`,
`Lis dans l'ordre. Ne saute rien. Le savoir que tu ignores est celui qui te tuera.`,
{sign:true}
]},

{ id:'I', num:'I', title:'Avant l\'Ordre', body:[
`Avant d'être un démon, j'étais déjà un monstre. Je mangeais les hommes. Ce n'est pas une confession, c'est un fait, et tu devras apprendre à regarder les faits sans détourner les yeux.`,
`Puis la maladie est venue. Incurable. Mon corps pourrissait de l'intérieur, et pour la première fois je n'avais aucun moyen d'agir sur ma propre fin. C'est à ce moment que j'ai été transformé. Je n'ai pas été sauvé : j'ai été converti.`,
`J'ai été adopté par **Traya Hord, la Dame au Biwa**. Je porte son nom. Retiens ceci, car tout le reste en découle : c'est son sang qui coule dans le nôtre.`,
`Mes premières années de démon furent sanglantes. J'appartenais au **pouvoir sanguinaire**. J'y étais efficace. J'y étais aussi aveugle. Je croyais que la puissance se mesurait en corps.`,
{note:`On ne quitte pas le pouvoir sanguinaire parce qu'on devient meilleur. On le quitte parce qu'on a vu plus loin.`},
{sign:true}
]},

{ id:'II', num:'II', title:'Daishi Hord et Harkness', body:[
`C'est un démon nommé **Daishi Hord** qui m'a montré l'Occulte. Il ne m'a rien enseigné de précis. Il m'a seulement fait comprendre qu'il existait une force qui ne demandait pas de sang, mais de vide.`,
`Peu après, j'ai affronté **Harkness**, une entité occulte suprême. Je l'avais presque vaincu. Presque. Il a fui avant sa défaite.`,
`Ce jour-là est né ce que les autres ont appelé une obsession. Je l'appelle une dette. Une entité qui fuit devant toi te dit une chose : qu'elle sait quelque chose que tu ignores. Je n'ai jamais supporté d'ignorer.`,
`Harkness ne fuit plus. Il est dans la Bague, à mon doigt. Je t'expliquerai.`,
{sign:true}
]},

{ id:'III', num:'III', title:'L\'énergie occulte', body:[
`Voici la base. Si tu ne comprends pas cette entrée, ne lis pas les suivantes.`,
`§**Son origine.** En recevant le sang, chaque démon reçoit des fragments de la puissance de Traya Hord. Ces fragments sont inertes. La plupart des démons vivent et meurent sans jamais les éveiller. C'est pour cela que l'énergie occulte se ressent davantage à mesure que l'on s'élève dans l'Ordre : plus le rang est haut, plus le fragment est sollicité.`,
`§**Son principe.** L'énergie occulte crée à partir de rien. Pour l'utiliser, il faut ressentir le vide : ce qui n'existe pas. C'est à partir de ce manque que l'esprit matérialise un tout. Un démon qui cherche la force dans ce qu'il possède ne touchera jamais l'Occulte. Il faut la chercher dans ce qui manque.`,
`**Les incantations** concentrent cette puissance. Elles sont la forme, l'énergie est la matière.`,
`**La tenue occulte** canalise l'énergie à l'intérieur du corps physique. Sans elle, l'énergie se disperse, même chez les plus aguerris. Ne la retire jamais au combat. Jamais.`,
`**Son isolement.** L'Occulte n'a aucune relation avec les autres Sphères de l'Ordre. Aucune. Ne cherche pas d'alliés de ce côté. Ne cherche pas de menaces non plus : les autres Sphères ne comprennent pas ce que nous faisons.`,
{note:`Rien n'est gratuit. Toute création consomme une part équivalente de non-existence. Garde cette phrase. Elle te servira à la fin.`},
{sign:true}
]},

{ id:'IV', num:'IV', title:'La Sphère Occulte', body:[
`Quand je suis arrivé, la Sphère Occulte n'était presque rien. Trois membres actifs : **Asashi**, **Kuroki**, et moi. J'étais le dernier arrivé. J'étais aussi le seul à avoir une vision.`,
`J'ai gravi les rangs avec patience :`,
{list:['Incantateur','Marcheur des Voiles','Collecteur d\'Ombre','Marchand des Âmes','Monarque des Ombres'], ordered:true},
`Comme Incantateur puis Marcheur des Voiles, j'ai attendu. Comme Collecteur d'Ombre, j'ai cessé d'attendre. Nos supérieurs théorisaient, ils ne bâtissaient rien.`,
`Avec l'autorisation et l'encouragement de **Shin.itori, Excellence Suprême n°3**, j'ai repris l'Occulte en main. J'ai reconstruit ce qui ne me convenait pas. Pièce par pièce, j'ai rendu mon supérieur hiérarchique inutile, puis absent. Je n'ai pas renversé la direction de l'Occulte. Je l'ai remplacée.`,
`Asashi est mort. Kuroki, tu le sauras bientôt, n'est plus vraiment là.`,
{sign:true}
]},

{ id:'V', num:'V', title:'Le mur du corps et le Quart de Sphère', body:[
`Au rang de Collecteur d'Ombre, j'ai rencontré le mur. Le corps d'un démon n'est pas fait pour aller plus loin.`,
`Pour devenir **Marchand des Âmes**, il faut être **débridé dans son noyau** : s'affranchir d'une limite, celle de connaître la réalité métapsychique de sa propre énergie. Autrement dit, le corps doit apprendre à rejeter ce qui existe. C'est contre-nature. C'est pour cela que presque personne n'y parvient.`,
`La solution vint de **Bess Sedouki**, un ancien Monarque des Ombres, aujourd'hui scellé par Traya Hord. Il n'a pas d'autre importance que celle-ci : il trouva deux sphères. Il absorba la première et devint Monarque. La seconde, il ne put l'absorber. Il la divisa en quatre et confia chaque fragment à un démon. Ce sont les **Quarts de Sphère**. Celui qui en possède un est libéré de toute limite.`,
`Shin.itori m'a confié l'un d'eux. Il m'a fallu plusieurs mois pour l'assimiler. J'y suis parvenu peu après être devenu **Lune Inférieure**.`,
{sign:true}
]},

{ id:'VI', num:'VI', title:'La Mémoire Occulte', body:[
`§Il existe un lieu où l'énergie occulte se souvient de tous ceux qui l'ont un jour touchée. Chaque incantation prononcée, chaque erreur, chaque découverte. Y entrer, c'est tout savoir. Le prix : le libre arbitre. On n'y règne pas, on y devient témoin.`,
`J'y ai envoyé Kuroki. Ma théorie était qu'un esprit assez discipliné pourrait tout assimiler, puis en ressortir. Il n'en est jamais ressorti. Il est mort avec toute la connaissance de l'arcane.`,
`Les autres croient qu'il a choisi ce sacrifice. Je les ai laissés le croire. Une Sphère qui doute de son dirigeant ne survit pas à sa première crise, et l'Occulte n'avait pas le luxe d'en traverser une.`,
`Tu es désormais le seul à connaître la vérité, Iroh. Retiens-en ceci : même mes certitudes ont eu un coût. Ne confonds jamais une théorie avec une promesse.`,
{sign:true}
]},

{ id:'VII', num:'VII', title:'Les trois étages du monde', body:[
`Le monde n'est pas un. Il est superposé.`,
`**1. Notre monde.** Celui des hommes, des démons, des pourfendeurs.`,
`§**2. Le Néant.** Un lieu où rien ne se trouve, mais où tout peut être créé. Inoffensif en apparence. Mortel pour qui y entre sans expérience, car ce que ton esprit y projette devient réel, y compris tes peurs.`,
`§**3. Les Limbes.** L'incarnation du danger et du désespoir. La concentration d'énergie occulte y est telle que je suis, à ce jour, le seul à avoir pu m'y déplacer. Pas sans séquelles. N'y entre pas avant d'être Monarque.`,
`**Au-delà : l'Enfer.** Il n'est accessible que par une porte cachée dans les Limbes.`,
`Pourquoi l'Enfer ? À cause de **Nashimu**. J'ai parlé au fantôme de ce démon, une ancienne **Lune Supérieure**. Ce qu'il savait dépassait tout ce que l'Ordre a jamais consigné. Mon intention était de descendre en Enfer, de le récupérer et de le ressusciter. C'est en cherchant la porte que j'ai réveillé ce qui la gardait.`,
{sign:true}
]},

{ id:'VIII', num:'VIII', title:'Les Gardiens et Athanos', body:[
`La porte des Limbes était gardée par **sept Gardiens**. Je les ai réveillés. C'était nécessaire. Ce fut aussi une catastrophe.`,
`Le premier, **Athanos**, fut jadis le gardien de la Trame, la structure qui relie les mondes. Pendant des millénaires, il en a porté seul les déchirures, dans sa propre chair. Mon intrusion a achevé ce que l'éternité avait commencé : il est devenu fou. Il a cessé de protéger la Trame. Il a voulu l'effacer. On l'a appelé le **Briseur de Trame**.`,
`Athanos a **dévoré deux Gardiens** pour surpasser les autres et s'est **allié à deux autres**. Il a attaqué le monde humain. Pendant des semaines, le chaos a frappé les démons comme les hommes. Il a fallu une alliance que personne n'aurait crue possible : pourfendeurs et démons, côte à côte.`,
`Pendant ce temps, j'ai fait ce que je fais toujours. J'ai procédé dans l'ordre. J'ai vaincu les Gardiens un par un.`,
`§Apprends ceci : **on ne tue pas un Gardien en détruisant son corps.** Chaque Gardien possède un domaine, caché ou non, où il enferme sa puissance sous la forme d'un **cœur**. Si ce cœur est détruit, il anéantit une vaste zone autour de lui. Les tuer, c'est donc risquer de tout raser.`,
`Lors de la bataille finale contre Athanos, pendant que les autres se battaient contre son corps, **j'ai absorbé son cœur**. Athanos s'est désintégré fil après fil. Les autres ont cru à une victoire collective. C'était une récolte.`,
{h:'Les Gardiens scellés'},
{guardians:true},
`Ce que j'entends quand j'utilise la Bague : Harkness qui rugit. Lifty qui supplie, et dont les notes s'échappent parfois. Xerxess qui compte les secondes. Nexus qui calcule en silence. Tu les entendras aussi.`,
{sign:true}
]},

{ id:'IX', num:'IX', title:'La Bague du Monarque', body:[
`Pour vaincre les Gardiens sans raser le monde, j'ai créé un réceptacle : la **Bague du Monarque**.`,
`Elle est forgée dans l'**Anmaniark**, un minerai que j'ai créé. Sa particularité : il permet la circulation de l'énergie occulte. Aucune autre matière ne le fait.`,
`§Chaque cœur de Gardien y est enfermé. En son centre, j'ai façonné, à l'identique de ceux des Gardiens, **mon propre cœur occulte**. Le tout forme un circuit fermé. C'est en rassemblant ces cœurs que je suis devenu **Monarque des Ombres**.`,
`La règle est simple et elle est absolue : <span class="warn"><strong>si la Bague est détruite, son porteur meurt.</strong></span>`,
`Je le savais en la forgeant. Je l'ai forgée quand même. Tu comprendras pourquoi à l'entrée XII.`,
`Les autres ignorent une dernière chose. La Bague n'est pas qu'une prison. Les Gardiens sont les enfants de celui qui a tissé la Trame. Chaque cri étouffé remonte la Trame jusqu'à lui. **La Bague est une balise.** Je le sais depuis le premier jour.`,
{sign:true}
]},

{ id:'X', num:'X', title:'Le serment des écoles et le pacte des incantations', body:[
`Un Monarque ne règne pas par la force. Il règne par ce que les autres ignorent.`,
`Lorsqu'un Collecteur d'Ombre fonde une école, il prête serment au Monarque. Il croit prêter allégeance. En réalité, ce serment me permet de **siphonner l'école à volonté**, sans que les Collecteurs ni les Marchands des Âmes ne s'en rendent jamais compte.`,
`J'ai fait de même avec les incantations. J'en ai créé une multitude. Derrière chacune, derrière chaque sourire que j'ai offert en les enseignant, j'ai caché un pacte. Quiconque les utilise ou rejoint une école me **nourrit**.`,
`Ce n'était pas de l'avidité. C'était de la préparation. Je savais que la prochaine menace viendrait, et je savais qu'elle dépasserait tout ce que l'Ordre pourrait lui opposer.`,
`Les membres de la Sphère sont des pions. Je ne le dis pas avec mépris. Je le dis avec exactitude. Le seul qui ait jamais compté, c'est toi.`,
{sign:true}
]},

{ id:'XI', num:'XI', title:'L\'Architecte', body:[
`Les Gardiens protégeaient une porte. Ils ne protégeaient pas le monde de ce qui se trouve derrière.`,
`On l'appelle **l'Architecte**. Les anciennes archives le nomment **le Créateur**, ou le **Père des Limbes**. C'est lui qui a tissé la Trame. Ce sont ses enfants que j'ai enchaînés.`,
`§On ne le voit pas. On le ressent. Toutes les entités des Limbes le craignent et le considèrent comme un dieu. Il était présent dans les Limbes avant même leur création. Il les contrôle. Il se tient dans le Néant.`,
`Je n'ai jamais pu l'approcher.`,
`§Comprends l'échelle. Son énergie occulte ne fait pas que dépasser la mienne : à côté de lui, je ne suis qu'un grain de poussière. Les créatures à ses côtés valent chacune des centaines d'Athanos. Et la Bague lui dit exactement où je suis. Son armée s'assemble.`,
`Je ne gagnerai pas. Je le sais. Je l'ai toujours su.`,
`C'est précisément pour cela que j'ai un plan.`,
{sign:true}
]},

{ id:'XII', num:'XII', title:'La théorie de la dissonance', body:[
`Relis l'entrée III. Toute création consomme une part équivalente de non-existence.`,
`§**1. La balance.** Le Néant est un réservoir de potentiel pur. Les Limbes en sont l'exact opposé : une saturation d'énergie. Les deux étages se tiennent en tension, comme les deux plateaux d'une balance.`,
`§**2. L'invulnérabilité de l'Architecte.** Il ne se trouve ni tout à fait dans le Néant, ni tout à fait dans les Limbes. Il est le fléau de la balance. Il existe *entre* l'existence et l'absence. Rien de ce qui existe ne peut donc le toucher. Une lame ordinaire, même occulte, le traverserait comme on traverse une idée.`,
`§**3. L'équilibre comme déséquilibre.** La Bague contient les cœurs des Gardiens et le mien, en circuit fermé dans l'Anmaniark. Détruit seul, un cœur rase une zone entière. Mais si tous se rompent **au même instant**, dans le Néant, au point exact de symétrie avec les Limbes, leurs déflagrations s'annulent. Ce qui reste n'est pas une explosion. C'est une **dissonance** : un lieu où l'espace et le temps ne s'accordent plus. Pendant ce bref instant, l'Architecte, privé de sa balance, devient localisable. Il n'existe pas encore, mais il est quelque part.`,
`§**4. Le prix.** Si la Bague est détruite, son porteur meurt. Mon combat final n'est pas une tentative de victoire. C'est l'allumage de la dissonance. Je ne peux pas échouer, parce que ma mort *est* la réussite.`,
`Je l'ai calculé le jour où j'ai forgé la Bague.`,
{sign:true}
]},

{ id:'XIII', num:'XIII', title:'L\'Épée dimensionnelle', body:[
`Quand la Bague se brisera, l'Anmaniark ne disparaîtra pas. Ses éclats absorberont la dissonance et deviendront du **vide cristallisé** : la seule matière capable de trancher ce qui n'existe pas et de fendre le vide.`,
`C'est ainsi que tu récupéreras l'Anmaniark, Iroh : dans les ruines de ma Bague. Je ferai en sorte que tu y aies accès.`,
`§Avec lui, le prochain Monarque devra forger une **épée dimensionnelle**. Elle ne fonctionnera que sur l'Architecte, puisqu'elle sera née de sa propre balance. Contre tout le reste, elle sera inutile. Ne la gaspille pas.`,
`Mais l'Anmaniark seul ne suffit pas. Il manque un troisième élément, et c'est le dernier secret de ce journal : **le Puits des Hord**.`,
`Ce puits est un artéfact ancien. Par le passé, il a offert sa puissance à **Traya Hord, la Dame au Biwa**. Il ne donne rien gratuitement. Se servir de lui exige un **sacrifice énorme**, et tu te souviens de ce que je t'ai écrit à l'entrée III : toute création consomme une part équivalente de non-existence.`,
`§Si tu parviens à combiner la matière du Puits des Hord avec l'Anmaniark et avec les ruines de ma Bague, alors, et seulement alors, tu tiendras ton arme.`,
`Mais seul un Monarque peut la forger, car il faut ressentir le vide à un niveau qu'aucun Marchand des Âmes n'atteint. Le Monarque doit **transcender**. Et ma transcendance ne se transmet que par le savoir.`,
`C'est pour cela que tu tiens ce journal.`,
`Lorsque tu auras tout compris, tu ne seras plus mon second. Tu seras ce que j'étais.`,
{sign:true}
]},

{ id:'XIV', num:'XIV', title:'Ce qui reste inachevé', body:[
`Je ne laisse pas un monde en ordre. Je laisse une liste.`,
{list:[
`**L'Architecte.** Ta tâche, et la seule qui compte vraiment.`,
`**L'Enfer et Nashimu.** La porte des Limbes est désormais sans Gardiens. Nashimu attend toujours de l'autre côté, avec ce qu'il sait. Ne t'y risque qu'une fois Monarque.`,
`**Le Puits des Hord.** Il faut en extraire la matière de l'épée. Prépare-toi à en payer le prix.`,
`**Les Gardiens.** Leurs voix ne s'éteindront pas avec moi. Lorsque la Bague se brisera, je ne sais pas ce qu'il restera d'eux. Sois prêt.`,
`**Les écoles et le pacte.** Le serment me liait à moi. Ce qu'il deviendra après ma mort, je l'ignore. Observe avant d'agir.`,
`**Kuroki.** Il est toujours dans la Mémoire Occulte. Peut-être qu'un jour quelqu'un trouvera comment en sortir. Pas moi.`,
`**Les trois autres Quarts de Sphère.** Ils existent quelque part. Ce n'est pas une priorité.`
]},
{sign:true}
]},

{ id:'final', num:'Dernière entrée', title:'Testament', body:[
`Tu as tout lu.`,
`Tu sais maintenant ce que j'ai été : un cannibale, un démon de sang, un menteur méthodique, un voleur de puissance, un Monarque. Je ne te demande pas de m'excuser. Je te demande de comprendre que chacune de ces choses avait une fonction.`,
`Je n'ai jamais cru que je vaincrais l'Architecte. J'ai seulement cru que quelqu'un le pourrait, si je lui ouvrais le chemin. Ce quelqu'un, c'est toi.`,
`Tu étais enfantin. Tu l'es encore un peu. Garde cette part. C'est elle qui t'a fait avancer quand d'autres auraient renoncé. C'est la seule chose que je ne t'ai pas apprise.`,
`Ne pleure pas. Forge.`,
{sign:true}
]}
];

/* Les cinq Gardiens (repris de « Chroniques des Lymbes ») */
const GUARDIANS = [
{ name:'Harkness', title:'La Colère', color:'#9b1c1c',
  quote:`« Un jour, ces chaînes fondront sous la fureur de mon Père. Et ce jour-là, je me souviendrai de chacun de vous. »`,
  lore:`Premier Gardien capturé, Harkness fut aussi le premier à comprendre qu'il ne s'échapperait pas. Cette certitude ne l'a pas brisé : elle l'a nourri. Dans l'obscurité de la Bague, sa rage n'a jamais faibli ; elle a simplement appris à attendre. Chaque fois que Hanma Hord puise dans son énergie, c'est un fragment de cette colère contenue qui s'échappe, brûlant un peu plus loin qu'il ne le devrait. Harkness ne parle pas de liberté. Il parle de vengeance, et il promet, à qui veut l'entendre à travers le métal, que la fureur du Créateur ne sera rien comparée à la sienne le jour où l'acier cédera.`,
  forme:'Fureur Ardente', menace:'Extrême', statut:'Enchaîné — Premier Sceau' },
{ name:'Nexus', title:'Omniscience Partielle', color:'#1e4f9c',
  quote:`« Vous voyez une prison. Moi, j'y vois une adresse. »`,
  lore:`Contrairement à ses frères et sœur d'infortune, Nexus n'a jamais hurlé contre sa capture. Esprit froid, méthodique, presque détaché de sa propre souffrance, il a passé les premiers siècles de son enfermement non pas à se débattre, mais à calculer. C'est lui, le premier, qui a compris ce que la Bague représentait réellement : non pas un tombeau scellant cinq puissances, mais une balise, un point fixe dans la Trame que quelque chose, quelque part, ne cesse d'observer. Nexus ne cherche pas à se libérer par la force. Il attend que la logique fasse le travail à sa place.`,
  forme:'Conscience Analytique', menace:'Imprévisible', statut:'Enchaîné — Second Sceau' },
{ name:'Lifty', title:'La Haine & l\'Amour', color:'#6b2aa0',
  quote:`« Je le hais comme on hait ce qu'on ne peut cesser d'aimer. Et cet amour-là, Hanma, te tuera. »`,
  lore:`Seule voix féminine parmi les cinq, Lifty possède un chant qui a désarmé plus d'un Pourfendeur avant qu'il ne comprenne la nature de ce qu'il entendait. Sa relation avec Hanma Hord échappe à toute logique simple : elle l'aime, sincèrement, de la manière dont une âme piégée peut s'attacher à celui qui la manipule, et elle le hait avec la même intensité, pour la même raison. Cet amour empoisonné n'est pas une métaphore. Chaque sentiment que Lifty éprouve pour Hanma ronge un peu plus son âme depuis l'intérieur, et par extension, celle de son porteur. Elle ne cherche pas à le détruire. Elle cherche, désespérément, à ce qu'il comprenne ce que son amour lui coûte.`,
  forme:'Chant Envoûtant', menace:'Corrosive', statut:'Enchaînée — Troisième Sceau' },
{ name:'Xerxess', title:'La Pièce Détachée', color:'#4a5568',
  quote:`« Je ne suis qu'un fragment. Mais rassemblé, je suis l'interrupteur qui éteint tout. »`,
  lore:`Xerxess n'est pas entier, et c'est précisément ce qui le rend terrifiant. Brisé en morceaux avant même son enfermement dans la Bague, il existe comme un puzzle dispersé à travers les Limbes, dont seule une fraction repose réellement dans l'anneau. Le reste attend, dispersé, inerte, presque oublié. Xerxess ne lutte pas, ne supplie pas, ne menace pas comme ses frères. Il compte. Il attend patiemment que le Créateur, le seul capable de retrouver et de réassembler chacun de ses fragments, vienne compléter le puzzle. Et quand ce jour viendra, Xerxess ne promet qu'une chose : l'extinction, nette et définitive, de tout ce que la Bague a jamais alimenté.`,
  forme:'Fragmenté', menace:'Latente — Catastrophique si réuni', statut:'Enchaîné — Quatrième Sceau' },
{ name:'Athanos (écho)', title:'La Puissance', color:'#b4690e',
  quote:`« Ce que vous portez n'est qu'un écho. Priez pour ne jamais rencontrer la source. »`,
  lore:`Ce fragment enchaîné dans la Bague n'est pas Athanos tout entier, mais un écho de sa puissance, arraché avant même que le Briseur de Trame n'erre librement à travers les Lymbes. Force brute à l'état pur, cet écho tord et déforme le métal même qui le retient : la Bague, dit-on, porte des fissures invisibles qui ne cessent de s'élargir. Ce fragment ne parle presque jamais. Quand il le fait, c'est pour rappeler à quiconque l'écoute qu'il n'est qu'une esquille de quelque chose d'infiniment plus grand, et que le véritable Athanos, celui qui erre au-delà du voile, n'a jamais été vaincu. Seulement dispersé.`,
  forme:'Écho de Puissance Brute', menace:'Catastrophique', statut:'Enchaîné — Cinquième Sceau' }
];

/* Glossaire : alias reconnus dans le texte → soulignés à l'encre */
const GLOSSARY = [
 { id:'energie-occulte', term:'Énergie occulte', alias:['énergie occulte'], def:`Fragments de la puissance de Traya Hord, éveillés en ressentant le vide ; crée à partir de rien.` },
 { id:'incantation', term:'Incantation', alias:['incantations','incantation'], def:`Forme qui concentre l'énergie occulte.` },
 { id:'tenue-occulte', term:'Tenue occulte', alias:['tenue occulte'], def:`Canalise l'énergie dans le corps ; sans elle, l'énergie se disperse.` },
 { id:'quart-de-sphere', term:'Quart de Sphère', alias:['Quarts de Sphère','Quart de Sphère'], def:`Fragment de la seconde sphère de Bess Sedouki ; libère son porteur de toute limite.` },
 { id:'debride', term:'Débridé', alias:['débridé dans son noyau','débridé'], def:`État du noyau nécessaire pour devenir Marchand des Âmes.` },
 { id:'transcendance', term:'Transcendance', alias:['transcendance','transcender'], def:`Condition pour devenir Monarque ; se transmet par le savoir.` },
 { id:'coeur', term:'Cœur (de Gardien)', alias:['cœurs','cœur'], def:`Réservoir de la puissance d'un Gardien ; sa destruction rase une vaste zone.` },
 { id:'anmaniark', term:'Anmaniark', alias:['Anmaniark'], def:`Minerai créé par Hanma, permettant la circulation de l'énergie occulte.` },
 { id:'bague', term:'Bague du Monarque', alias:['Bague du Monarque','Bague'], def:`Réceptacle en Anmaniark contenant les cœurs scellés et celui de Hanma ; sa destruction tue son porteur ; balise vers l'Architecte.` },
 { id:'serment', term:'Serment des écoles', alias:['serment'], def:`Serment prêté par un Collecteur fondant une école, permettant au Monarque de la siphonner.` },
 { id:'trame', term:'Trame', alias:['Trame'], def:`Structure tissée par le Créateur qui relie les mondes.` },
 { id:'dissonance', term:'Dissonance', alias:['dissonance'], def:`Rupture spatio-temporelle née de la destruction simultanée des cœurs.` },
 { id:'epee', term:'Épée dimensionnelle', alias:['épée dimensionnelle'], def:`Arme de vide cristallisé, seule capable de blesser l'Architecte. Forgée en combinant la matière du Puits des Hord, l'Anmaniark et les ruines de la Bague.` },
 { id:'puits', term:'Puits des Hord', alias:['Puits des Hord'], def:`Artéfact ancien qui offrit jadis sa puissance à Traya Hord. Son usage exige un sacrifice énorme ; sa matière est nécessaire à l'épée dimensionnelle.` },
 { id:'neant', term:'Néant', alias:['Néant'], def:`Lieu où rien n'existe, mais où tout peut être créé.` },
 { id:'limbes', term:'Limbes', alias:['Limbes'], def:`Saturation d'énergie occulte, domaine de l'Architecte.` },
 { id:'memoire', term:'Mémoire Occulte', alias:['Mémoire Occulte'], def:`Mémoire de tous les utilisateurs de l'énergie occulte, au prix du libre arbitre.` }
];

const PERSONNAGES = [
 ['Hanma Hord','Monarque des Ombres, auteur du journal'],
 ['Iroh Jin','Marchand des Âmes, second et héritier de Hanma'],
 ['Traya Hord','La Dame au Biwa, mère adoptive de Hanma'],
 ['Daishi Hord','Démon qui initia Hanma à l\'Occulte'],
 ['Shin.itori','Excellence Suprême n°3, soutien de Hanma, lui confia un Quart de Sphère'],
 ['Asashi','Membre fondateur actif de la Sphère, mort'],
 ['Kuroki','Membre fondateur actif, perdu dans la Mémoire Occulte'],
 ['Bess Sedouki','Ancien Monarque des Ombres, scellé par Traya Hord'],
 ['Nashimu','Ancienne Lune Supérieure, en Enfer'],
 ['Harkness','Entité occulte suprême, scellée dans la Bague'],
 ['Athanos','Gardien de la Trame devenu le Briseur de Trame, détruit, cœur absorbé par Hanma'],
 ['Lifty, Xerxess, Nexus','Gardiens scellés dans la Bague'],
 ['L\'Architecte','Le Créateur, Père des Limbes']
];

const LIEUX = [
 ['Notre monde','Le monde des hommes, des démons et des pourfendeurs.'],
 ['Le Néant','Rien n\'y existe, tout peut y être créé.'],
 ['Les Limbes','Saturation d\'énergie occulte, domaine de l\'Architecte.'],
 ['La porte des Limbes','Mène à l\'Enfer, autrefois gardée par sept Gardiens.'],
 ['L\'Enfer','Où se trouve Nashimu.'],
 ['La Mémoire Occulte','Mémoire de tous les utilisateurs de l\'énergie occulte, au prix du libre arbitre.'],
 ['Les domaines des Gardiens','Où chacun cachait son cœur.'],
 ['Le Puits des Hord','Artéfact qui offrit sa puissance à Traya Hord ; matière nécessaire à l\'épée dimensionnelle, au prix d\'un sacrifice énorme.']
];

const CHRONO = [
 `Hanma, cannibale humain, contracte une maladie incurable.`,
 `Transformation en démon ; adoption par Traya Hord.`,
 `Période dans le pouvoir sanguinaire.`,
 `Initiation à l'Occulte par Daishi Hord.`,
 `Affrontement contre Harkness, qui fuit.`,
 `Entrée dans la Sphère Occulte (Asashi, Kuroki, Hanma).`,
 `Ascension : Incantateur → Marcheur des Voiles → Collecteur d'Ombre.`,
 `Avec Shin.itori, Hanma reprend l'Occulte et évince son supérieur.`,
 `Le mur du corps ; Shin.itori lui confie un Quart de Sphère.`,
 `Hanma devient Lune Inférieure, puis assimile le Quart : Marchand des Âmes.`,
 `Kuroki est envoyé dans la Mémoire Occulte et n'en revient pas.`,
 `Rencontre avec le fantôme de Nashimu ; quête de l'Enfer.`,
 `Découverte de la porte des Limbes ; réveil des Gardiens ; folie d'Athanos.`,
 `Semaines de chaos ; alliance pourfendeurs et démons.`,
 `Hanma vainc les Gardiens un par un et absorbe le cœur d'Athanos.`,
 `Création de la Bague du Monarque ; Hanma devient Monarque des Ombres.`,
 `Mise en place du serment des écoles et du pacte des incantations.`,
 `L'Architecte se rapproche ; Hanma prépare la dissonance.`,
 `Rédaction du journal pour Iroh Jin.`,
 `*Le combat final.*`
];

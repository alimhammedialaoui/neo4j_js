Create (Oussama:Usager {nomComplet:'Oussama Siwane', cin:'BB00000', dateDeNaissance:"1999-04-02", handicap:'N', fonction:'Etudiant'})
Create (Ahmed:Usager {nomComplet:'Ahmed Kassem', cin:'AA00000',dateDeNaissance:"1984-10-09", handicap:'N', fonction:'Salarié'})
Create (Anwar:Usager {nomComplet:'Anwar Miftah', cin:'CC00000',dateDeNaissance:"1955-08-30", handicap:'O', fonction:'Retraité'})

Create (MT1:MoyenTransport {type:'Tram', no:'D11', constructeur:'Luxtram', anneeMiseEnService:'2012'})
Create (MT2:MoyenTransport {type:'Taxi', no:'83748d8', constructeur:'Dacia', anneeMiseEnService:'2016'})
Create (MT3:MoyenTransport {type:'Bus', no:'82938a6', constructeur:'Volvo', anneeMiseEnService:'2008'})
Create (MT4:MoyenTransport {type:'Covoiturage', no:'23689j0', constructeur:'Renault', anneeMiseEnService:'2018'})

Create (FranceVille:Quartier {nom:'FranceVille - Anoual'})
Create (Derbghallef:Quartier {nom:'Maarif - Derbghallef'})
Create (Beausejour:Quartier {nom:'Quartier Beauséjour'})
Create (Valfleuri:Quartier {nom:'Quartier Valfleuri - Riviera'})
Create (Roudani:Quartier {nom:'Quartier Ibrahim Roudani'})
Create (YacMan:Quartier {nom:'Quartier Yacoub Mansour'})

Create (AnoualT:Station {nom:'Station de correspondance Anoual tramway'})
Create (AnoualB:Station {nom:'Station Anoual bus'})
Create (Ghandi:Station {nom:'Station Ghandi'})
Create (Riviera:Station {nom:'Station Riviera'})
Create (DerbghallefT:Station {nom:'Station Derb Ghallef tramway'})
Create (DerbghallefB:Station {nom:'Station Derb Ghallef bus'})
Create (Biranz:Station {nom:'Station Biranzaran'})
Create (Ouelmes:Station {nom:'Station Ouelmes'})
Create (Sokrate:Station {nom:'Station Sokrate'})
Create (Fleuriste:Station {nom:'Station Marché des fleurs'})
Create (Soumya:Station {nom:'Station Rue Soumya'})
Create (Abdelmoumen:Station {nom:'Station Abdelmoumen'})

Create
(Oussama)-[:PREFERS{poids:2}]->(MT1),
(Oussama)-[:PREFERS{poids:0}]->(MT3),
(Oussama)-[:PREFERS{poids:1}]->(MT2),
(Ahmed)-[:PREFERS{poids:2}]->(MT3),
(Ahmed)-[:PREFERS{poids:1}]->(MT2),
(Anwar)-[:PREFERS{poids:2}]->(MT2),

(MT1)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(AnoualT),
(MT1)-[:STOPS_AT{heureArriv:time("13:43:00")}]->(DerbghallefT),
(MT1)-[:STOPS_AT{heureArriv:time("13:46:00")}]->(Riviera),
(MT1)-[:STOPS_AT{heureArriv:time("13:52:00")}]->(Ghandi),

(MT3)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(AnoualB),
(MT3)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(DerbghallefB),
(MT3)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(Fleuriste),
(MT3)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(Biranz),
(MT3)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(Sokrate),
(MT3)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(Ouelmes),

(MT2)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(AnoualB),
(MT2)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(Abdelmoumen),
(MT2)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(Soumya),
(MT2)-[:STOPS_AT{heureArriv:time("13:40:00")}]->(Biranz),

(AnoualT)-[:FOLLOWED_BY{distance:500, duree:4}]->(DerbghallefT),
(DerbghallefT)-[:FOLLOWED_BY{distance:600, duree:3}]->(Riviera),
(Riviera)-[:FOLLOWED_BY{distance:800, duree:6}]->(Ghandi),
(AnoualB)-[:FOLLOWED_BY{distance:450, duree:5}]->(DerbghallefB),
(DerbghallefB)-[:FOLLOWED_BY{distance:830, duree:7}]->(Fleuriste),
(Fleuriste)-[:FOLLOWED_BY{distance:720, duree:7}]->(Biranz),
(Biranz)-[:FOLLOWED_BY{distance:400, duree:8}]->(Sokrate),
(Sokrate)-[:FOLLOWED_BY{distance:380, duree:10}]->(Ouelmes),
(AnoualB)-[:FOLLOWED_BY{distance:500, duree:3}]->(Abdelmoumen),
(Abdelmoumen)-[:FOLLOWED_BY{distance:600, duree:7}]->(Soumya),
(Soumya)-[:FOLLOWED_BY{distance:400, duree:9}]->(Biranz),

(AnoualT)-[:BELONGS_TO]->(FranceVille),
(DerbghallefT)-[:BELONGS_TO]->(Derbghallef),
(AnoualB)-[:BELONGS_TO]->(FranceVille),
(DerbghallefB)-[:BELONGS_TO]->(Derbghallef),
(Ouelmes)-[:BELONGS_TO]->(Beausejour),
(Ghandi)-[:BELONGS_TO]->(Beausejour),
(Sokrate)-[:BELONGS_TO]->(YacMan),
(Biranz)-[:BELONGS_TO]->(Roudani),
(Riviera)-[:BELONGS_TO]->(Valfleuri),
(Fleuriste)-[:BELONGS_TO]->(Valfleuri),
(Abdelmoumen)-[:BELONGS_TO]->(Derbghallef),
(Soumya)-[:BELONGS_TO]->(Derbghallef)



// match p=(BEGIN:Station)-[:FOLLOWED_BY*]->(END:Station)
// where BEGIN.nom ='Station de correspondance Anoual tramway' AND END.nom='Station Ghandi'
// return nodes(p) as chemin,reduce(dis=0, u in relationships(p)| dis +(u.distance)) as distance

// match p=(BEGIN:Station)-[:FOLLOWED_BY*]->(END:Station)
// where BEGIN.nom ='Station Anoual bus' AND END.nom='Station Sokrate'
// return BEGIN.nom as Depart,END.nom as Arrivee,[n in nodes(p)| n.nom] as chemin,reduce(dis=0, r in relationships(p)| dis+(r.distance)) as distance
// order by distance
// LIMIT 1

// call{
// match p=(BEGIN:Station)-[:FOLLOWED_BY*]->(END:Station)
// where BEGIN.nom ='Station de correspondance Anoual tramway' AND END.nom='Station Ghandi'
// return BEGIN.nom +"\n"+ END.nom as inputs,nodes(p) as chemin,reduce(duree=0, r in relationships(p)| duree+(r.duree)) as duree
// order by duree
// LIMIT 1
// }
// match p=(n1:MoyenTransport)-[:STOPS_AT*]->(n2:Station)
// where n2 in chemin
// return distinct inputs ,n1.type as Moyen_adequat,[c in chemin|c.nom] as Chemin,duree+" mn" as Duree_du_trajet

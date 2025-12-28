/**
 * Types pour les services
 */

export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  detailsKey: string;
  technologies: string[];
  color: string;
}

export interface Technology {
  name: string;
  category: string;
}
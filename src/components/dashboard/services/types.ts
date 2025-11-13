
export type Service = {
  id: string;
  nameInEnglish: string;
  nameInTamil: string;
  icon: string;
  categoryId: string;
  descriptionInEnglish: string;
  descriptionInTamil: string;
  isActive: boolean;
  order: number;
  
};

export type ServiceFormData = {
  nameInEnglish: string;
  nameInTamil: string;
  icon: string;
  categoryId: string;
  descriptionInEnglish: string;
  descriptionInTamil: string;
  isActive: boolean;
  order: number;
};

export function Column(options?: any): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {

  };
}

export function Entity(options?: any): ClassDecorator {
  return function (target: any) {

  };
}


export function PrimaryGeneratedColumn() {
  return Column();
}

export function ManyToOne() {
  return Column();
}

export function UpdateDateColumn() {
  return Column();
}

export function CreateDateColumn() {
  return Column();
}

export function DeleteDateColumn() {
  return Column();
}

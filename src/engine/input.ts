export class InputState {
  private readonly pressed = new Set<string>();

  attach(target: Window = window): void {
    target.addEventListener('keydown', (event) => this.pressed.add(event.code));
    target.addEventListener('keyup', (event) => this.pressed.delete(event.code));
  }

  isPressed(code: string): boolean {
    return this.pressed.has(code);
  }
}

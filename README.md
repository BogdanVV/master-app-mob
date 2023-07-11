# WTF IS THIS?

![qwe](https://i.ytimg.com/vi/Foihgti2lHU/maxresdefault.jpg)

It's a react-native (hereinafter referred to as the `RN`) project I'm using to learn stuff related to it.
It currently consists of (_WHAT A SURPRISE_) `todos` and `settings` sections. Maybe, there's gonna be smth else like chat or/and chart for controlling your personal budgets (_WHAT A SURPRISE x2_), dunno.

## State management

- [Zustand](https://github.com/pmndrs/zustand) - mainly for managing API calls;
- `Context API` - for simple stuff like boolean flags and alike. I was thinking about using it as only state-management solution, but then I ran into Zustand and realised it's using hook approach which I prefer over any others. The only downside that I see now is that life-cycle hooks like `useEffect` aren't available inside Zustand state objects. But it's fine.

## Animations

yeap, there are animations created using `react-native-reanimated` (_WHAT A SURPRISE x3_)`. Good luck finding all of them (like anyone is actually gonna try :crying_cat_face:).

## Forms

- `react-hook-form` + `zod` = :heart:

## Some pains

- in the beginning `styled-components/native` was used for styling, but it was excluded almost completely for being buggy AF, especially with TS. Also, it requires a lot of boilerplate code and separate files alongside component's `.tsx` file and I don't like it. Using standard `StyleSheet` is actually better IMHO.

##

No fancy stuff here yet.

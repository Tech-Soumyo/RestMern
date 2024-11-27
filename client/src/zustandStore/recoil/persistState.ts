import { AtomEffect } from "recoil";

export function persistState<T>(key: string): AtomEffect<T> {
  return ({ setSelf, onSet }) => {
    // Load the initial state from localStorage
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
}

// recoil/effects/persistState.ts
// import { AtomEffect } from "recoil";

// export function persistState<T>(key: string): AtomEffect<T> {
//   return ({ setSelf, onSet }) => {
//     try {
//       // Load the initial state from localStorage with error handling
//       const savedValue = localStorage.getItem(key);
//       if (savedValue != null) {
//         try {
//           const parsedValue = JSON.parse(savedValue);
//           // Validate parsed data type if necessary
//           if (isValidData<T>(parsedValue)) {
//             setSelf(parsedValue);
//           } else {
//             console.warn(`Invalid data format for key: ${key}`);
//           }
//         } catch (error) {
//           console.error(`Failed to parse JSON for key: ${key}`, error);
//         }
//       }
//     } catch (error) {
//       console.error(`Failed to load localStorage for key: ${key}`, error);
//     }

//     // Save state to localStorage whenever it changes, with error handling
//     onSet((newValue, _, isReset) => {
//       try {
//         if (isReset) {
//           localStorage.removeItem(key);
//         } else {
//           localStorage.setItem(key, JSON.stringify(newValue));
//         }
//       } catch (error) {
//         console.error(`Failed to save localStorage for key: ${key}`, error);
//       }
//     });
//   };
// }

// // Utility function for optional data validation (can be customized)
// function isValidData<T>(data: any): data is T {
//   // Add specific checks based on the type of data if needed
//   return true;
// }

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { delay, take, tap, map, switchMap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public _role: Subject<string> = new Subject<string>();

  private authService: AuthService;
  currentRole: string;
  dbId: string = '-MOjLr31HXDpzrzrM8WJ';

  userId: string;
  roles = ['responder', 'supervisor', 'survivor'];

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
  }

  get role() {
    return this._role.asObservable();
  }

  async addData(email: string, role: string) {
    await this.firestore.collection('users').add({email, role});
    // console.log("ADDING");
    // return this.http.post('https://disaster-app-ec8b5.firebaseio.com/users.json', {
    //   userId: 'devinvail@gmail.com',
    //   role: 'responder',
    // });
  }

  // update the user role on firebase and emits the updated role to the subscribers
  updateRole(role: string, userId: string) {
    this._role.next(role);
    return this.getUser(userId)
      .subscribe((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          try {
            // Updating the record on firebase
            const result = await doc.ref
              .update({
                role: role.toLowerCase(),
              })
            console.log('User update result', result);
          } catch (e) {
            console.log('User update result', e);
          }
        });
      });

    // return this._role.toPromise();
    // this.firestore.doc().update({ rating: $rating });

    // return this.http.put(`https://disaster-app-ec8b5.firebaseio.com/users.json?orderBy="userId"&equalTo="${userId}"`, {
    //   userId: "devinvail@gmail.com",
    //   role: "survivor",
    // });

    // this.firestore.collection('users', (ref) => ref.where('email', '==', 'rahul.p@applicationnexus.com')).
  }

  // get user role form local storage/ server
  fetchRole(userId: string) {
    console.log('TCL ->  ~ file: settings.service.ts ~ line 67 ~ SettingsService ~ fetchRole ~ userId', userId);
    // return this.http.get(`https://disaster-app-ec8b5.firebaseio.com/users.json?orderBy="userId"&equalTo="${userId}"`).pipe(
    //   take(1),
    //   map((resData) => {
    //     console.log('resData in service: ', resData);

    //     for (const key in resData) {
    //       if (resData.hasOwnProperty(key)) {
    //         console.log('resData[key].role: ', resData[key].role);
    //         this.currentRole = resData[key].role;
    //       }
    //     }
    //     return this.role;
    //   }),
    // );

    // Gets the user details from the firebase and emits the user role
    this.getUser(userId)
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // If user and user role present, emit the role
          if (doc.data() && doc.data().role) {
            this._role.next(doc.data().role);
          }
        });
      });
  }

  // Returns the user records from firebase
  getUser(userId: string) {
    return this.firestore.collection('users', (ref) => ref.where('email', '==', userId)).get();
  }
}

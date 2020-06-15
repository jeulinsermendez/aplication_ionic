import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { FriendWithSessionsService } from '../services/friend-with-sessions.service';
import { Friend } from '../shared/friend';
//import { Response } from '@angular/http';
 
@Component({
//  moduleId: module.id,
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss']
})
export class FriendsPage implements OnInit {
 
  public friends: Friend[];
  public requestResult: number;
  public selectedFriend: Friend;
 
  // injectem al constructor l'enrutament de la pàgina i el servei que hem creat
  // El servei FriendWithSessionsService s'ha d'afegir a la pàgina app.module.ts a providers per a que el tingui carregat, ho fem més endavant
  constructor(
    private router: Router,
    private friendService: FriendWithSessionsService
  ) { }
 
  ngOnInit() {
    this.getFriendsO();
  }
 
  // Aquest és el mètode que fa la crida al servei per obtenir tots els Friends i recull el resultat
  getFriendsO(): void {
    this.friendService
      .getAllFriends()
      .subscribe(friends => {
        this.friends = friends.data; this.requestResult = friends.resultCode
      });
  }
 
  onSelect(friend: Friend): void {
    this.selectedFriend = friend;
  }
 
  gotoDetail(): void {
    this.router.navigate(['/friend-detail', this.selectedFriend.phone]);
  }
 
  add(s_phone: string, s_name: string, s_age: string): void {
    const phone = s_phone.trim();
    const name = s_name.trim();
    const st_age = s_age.trim();
    if ((!phone) || (!name) || (!st_age)) { return; }
    const age = parseInt(st_age, 10);
    this.friendService
      .insert(new Friend(phone, name, age))
      .subscribe(friend => {
        this.friends.push(friend);
        this.selectedFriend = null;
      });
  }
 
  delete(friend: Friend): void {
    this.friendService
        .delete(friend)
        .subscribe(() => {
          this.friends = this.friends.filter(e => e !== friend);
          if (this.selectedFriend === friend) { this.selectedFriend = null; }
        });
  }
 
}